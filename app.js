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

new Vue({
	el: '#app',
	data() {
		return {
			selectedPlayer: null,
			vue: 'gameMenu',
			gameData: {
				startingLife: 40
			}
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
			this.vue = 'gameMenu'
		},
		openPlayersOption() {
			this.vue = 'playersOption'
		}
	},
	created() {
		registerPlayer(0, 'Player 1');
		registerPlayer(1, 'Player 2');
		registerPlayer(2, 'Player 3');
		registerPlayer(3, 'Player 4');
	}
})
