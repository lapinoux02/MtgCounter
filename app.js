// Gestion service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceWorker.js');
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

const PLAYERS = [];
const registerPlayer = (id, name) => {
	PLAYERS.push(new Player(id, name));
	PLAYERS.forEach(p => Object.assign(p.commanderDamages, PLAYERS.map(pp => ({id: pp.id, damage: 0}))));
}

// Gestion configuration globale
const CONF = {
	vibrations: true
}

new Vue({
	el: '#app',
	data() {
		return {
			selectedPlayer: null,
			vue: 'gameMenu',
			gameData: {
				startingLife: 40
			},
			players: PLAYERS
		}
	},
	methods: {
		goto(vue) {
			bzz();
			this.vue = vue;
			if (vue !== 'board') {
				history.pushState(null, window.location.href);
			}
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
		window.onpopstate = () => {
			this.vue = 'board';
		}

		// Création des joueurs
		let memoryPlayers = MM.getPlayers();
		if (memoryPlayers) {
			PLAYERS.push(...memoryPlayers);
			this.goto('board');
		} else {
			registerPlayer(0, 'Player 1');
			registerPlayer(1, 'Player 2');
			registerPlayer(2, 'Player 3');
			registerPlayer(3, 'Player 4');
		}
	},
	watch: {
		players: {
			deep: true,
			handler() {
				MM.savePlayers(PLAYERS);
			}
		}
	}
})
