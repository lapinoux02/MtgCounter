if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceWorker.js');
	});
}

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
		openCommanderDamage(player) {
			this.selectedPlayer = player;
			this.vue = 'commanderDamage';
		},
		openBoard() {
			this.vue = 'board';
		},
		openGameMenu() {
			this.vue = 'gameMenu';
		},
		openPlayersOption() {
			this.vue = 'playersOption';
		},
		openParametersMenu() {
			this.vue = 'parametersMenu';
		}
	},
	created() {
		let memoryPlayers = MM.getPlayers();
		if (memoryPlayers) {
			PLAYERS.push(...memoryPlayers);
			this.vue = 'board';
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
