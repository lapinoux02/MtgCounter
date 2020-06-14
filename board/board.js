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
			:key="i"
			@opencommanderdamage="openCommanderDamage"
			@dragstart="dragStart(player, i)"
			@drop="drop(i)"
		></playerTile>
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
		},
		dragStart(player, i) {
			this.dragged = player;
			this.draggedIndex = i;
		},
		drop(i) {
			bzz();
			this.players.splice(this.draggedIndex, 1, ...this.players.splice(i, 1, this.dragged))
		}
	}
})