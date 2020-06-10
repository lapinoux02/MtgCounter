Vue.component('game-menu', {
	props: ['gamedata'],
	data() {
		return {
			tmpData : {
				startingLife: CONF.startingLife,
				playerNumber: PLAYERS.length
			},
			showShare: navigator.share
		}
	},
	template: `<div id="gameMenu" class="menu">
		<div id="title">Menu</div>
		<div id="options">
			<startingLife :gameData="tmpData"></startingLife>
			<playersManager :gameData="tmpData"></playersManager>
			<div v-if="showShare" id="shareGame" class="menuOption">
				<div class="title">
					<span v-on:click="share">Share</span><span class="separator">|</span><span v-on:click="load">Load</span>
				</div>
			</div>
		</div>
		<buttonBar :primary="startNewGame" :secondary="openBoard" :secondaryText="'Cancel'" :primaryText="'START'"></buttonBar>
	</div>`,
	methods: {
		share() {
			navigator.share({
				text: minifiedPlayers()
			});
		},
		load() {
			navigator.clipboard.readText().then(text => {
				if (inflatePlayers(text)) {
					history.back();
				}
			});
		},
		startNewGame() {
			// Gestion du nombre de joueurs
			let length = PLAYERS.length;
			if (length > this.tmpData.playerNumber) {
				for (let i = this.tmpData.playerNumber; i < length; i++) {
					PLAYERS.pop();
				}
			} else {
				for (let i = length; i < this.tmpData.playerNumber; i++) {
					registerPlayer(`Player ${i+1}`);
				}
			}

			// Gestion des pv
			PLAYERS.forEach(p => {
				p.life = this.tmpData.startingLife
				p.poisonDamage = 0;
				p.commanderDamages = PLAYERS.map(pp => ({id: pp.id, damage: 0}));
			});
			CONF.startingLife = this.tmpData.startingLife;

			// Sauvegarde de la partie
			MM.savePlayers();
			MM.saveConf();

			history.back();
		},
		openBoard() {
			history.back();
		}
	}
})