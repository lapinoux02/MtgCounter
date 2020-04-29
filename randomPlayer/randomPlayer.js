Vue.component('randomPlayer', {
	data() {
		return {
			chosenOne: null
		}
	},
	computed: {
		randomPlayer() {
			return this.chosenOne || 'Click me';
		}
	},
	template: `<div id="randomPlayer" class="menuOption">
		<div class="title">Random Player</div>
		<div class="randomButton" v-on:click="choose">{{randomPlayer}}</div>
	</div>`,
	methods: {
		choose() {
			bzz();
			this.chosenOne = PLAYERS[Math.floor(Math.random() * PLAYERS.length)].name
		}
	}
})