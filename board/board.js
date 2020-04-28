Vue.component('board', {
	data() {
		return {
			players: PLAYERS
		}
	},
	template: `<div id="board">
		<playerTile
			v-for="(player, i) in players"
			:player="player"
			:id="getTileId(i)"
			@opencommanderdamage="openCommanderDamage"
			:key="i">
		</playerTile>
		<optionsButton
			@opengamemenu="openGameMenu"
			@openplayersoption="openPlayersOption"
			@openparametersmenu="openParametersMenu"
		></optionsButton>
	</div>`,
	methods: {
		getTileId(i) {
			return `tile${i + 1}${this.players.length}`
		},
		openCommanderDamage(e) {
			this.$emit('opencommanderdamage', e);
		},
		openGameMenu() {
			this.$emit('opengamemenu');
		},
		openPlayersOption() {
			this.$emit('openplayersoption');
		},
		openParametersMenu() {
			this.$emit('openparametersmenu')
		}
	}
})