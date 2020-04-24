Vue.component('game-menu', {
	props: ['gamedata'],
	template: `<div id="gameMenu">
		<div id="options">
			<startingLife :gameData="gamedata"></startingLife>
			<playersManager></playersManager>
			<randomPlayer></randomPlayer>
		</div>
		<buttonBar :primary="openBoard" :secondary="openBoard"></buttonBar>
	</div>`,
	methods: {
		openBoard() {
			this.$emit('openboard');
		}
	}
})