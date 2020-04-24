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
		<div id="optionsButton"
			:class="getOptionsButtonClass()"
			v-on:click="openOptions"
		></div>
	</div>`,
	methods: {
		getTileId(i) {
			return `tile${i + 1}${this.players.length}`
		},
		openCommanderDamage(e) {
			this.$emit('opencommanderdamage', e);
		},
		getOptionsButtonClass() {
			return `optionsButton${this.players.length}`;
		},
		openOptions() {
			this.$emit('opengamemenu');
		}
	}
})