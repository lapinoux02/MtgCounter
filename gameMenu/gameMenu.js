Vue.component('game-menu', {
	props: ['gamedata'],
	data() {
		return {
			tmpData : {
				startingLife: this.gamedata.startingLife,
				playerNumber: PLAYERS.length
			}
		}
	},
	template: `<div id="gameMenu" class="menu">
		<div id="title">Menu</div>
		<div id="options">
			<startingLife :gameData="tmpData"></startingLife>
			<playersManager :gameData="tmpData"></playersManager>
			<randomPlayer></randomPlayer>
		</div>
		<buttonBar :primary="startNewGame" :secondary="openBoard" :secondaryText="'Cancel'" :primaryText="'START'"></buttonBar>
	</div>`,
	methods: {
		startNewGame() {
			// Gestion du nombre de joueurs
			let length = PLAYERS.length;
			if (length > this.tmpData.playerNumber) {
				for (let i = this.tmpData.playerNumber; i < length; i++) {
					PLAYERS.pop();
				}
			} else {
				for (let i = length; i < this.tmpData.playerNumber; i++) {
					registerPlayer(i, `Player ${i+1}`);
				}
			}

			// Gestion des pv
			PLAYERS.forEach(p => p.life = this.tmpData.startingLife);

			// Sauvegarde de la partie
			MM.savePlayers(PLAYERS);

			this.$emit('openboard');
		},
		openBoard() {
			this.$emit('openboard');
		}
	}
})