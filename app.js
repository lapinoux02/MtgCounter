// Gestion service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/MtgCounter/serviceWorker.js', {scope: '/MtgCounter/'});
	});
}

// Gestion joueurs
class Player {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.life = 40;
		this.poisonDamage = 0;
		this.commanderDamages = [];
	}
}
const registerPlayer = (name) => {
	for (var i=0; PLAYERS.find(p => p.id === i); i++);
	PLAYERS.push(new Player(i, name));
	PLAYERS.forEach(p => Object.assign(p.commanderDamages, PLAYERS.map(pp => ({id: pp.id, damage: 0}))));
}

const PLAYERS = [];

// Gestion configuration globale
const CONF = {
	vibrations: true,
	keepScreenAlive: true,
	theme: 'dark',
	startingLife: 40,
	screenDrag: true
}

new Vue({
	el: '#app',
	data() {
		return {
			selectedPlayer: null,
			vue: 'gameMenu',
			players: PLAYERS,
			conf: CONF
		}
	},
	methods: {
		goto(vue) {
			bzz();
			this.vue = vue;
		},
		openCommanderDamage(player) {
			this.selectedPlayer = player;
			this.goto('commanderDamage');
		},
		openBoard() {
			this.goto('board');
		},
		openGameMenu() {
			this.goto('gameMenu');
		},
		openPlayersOption() {
			this.goto('playersOption');
		},
		openParametersMenu() {
			this.goto('parametersMenu');
		}
	},
	created() {
		// Gestion historique (back button)
		window.onpopstate = (e) => {
			this.vue = e.state || 'board';
		}

		// Création des joueurs
		if (MM.loadPlayers()) {
			this.vue = 'board';
		} else {
			registerPlayer('Player 1');
			registerPlayer('Player 2');
			registerPlayer('Player 3');
			registerPlayer('Player 4');
			newHistoryState('board');
		}

		// Gestion de la conf
		MM.loadConf();
		CONF.keepScreenAlive ? wakeLock() : wakeUnlock();
	},
	watch: {
		players: {
			deep: true,
			handler() {
				MM.savePlayers();
			}
		}
	}
})
