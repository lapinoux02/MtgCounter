Vue.component('board', {
	props: ['players'],
	template: `<div id="board">
		<playerTile v-for="(player, i) in players" :player="player" :id="getId(i)":key="i"></playerTile>
	</div>`,
	methods: {
		getId(i) {
			return `tile${i + 1}${this.players.length}`
		}
	}
})