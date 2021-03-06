Vue.component('playersManager', {
	props: ['gameData'],
	data() {
		return {
			players: PLAYERS
		}
	},
	template: `<div id="playersManager" class="menuOption">
		<div class="title">Players</div>
		<div class="buttonsLine">
			<div class="squareButton" v-on:click="select(2)" :class="getClass(2)">2</div>
			<div class="squareButton" v-on:click="select(3)" :class="getClass(3)">3</div>
			<div class="squareButton" v-on:click="select(4)" :class="getClass(4)">4</div>
			<div class="squareButton" v-on:click="select(5)" :class="getClass(5)">5</div>
			<div class="squareButton" v-on:click="select(6)" :class="getClass(6)">6</div>
		</div>
	</div>`,
	methods: {
		getClass(num) {
			return this.gameData.playerNumber === num ? 'active' : '';
		},
		select(num) {
			bzz();
			this.gameData.playerNumber = num;
		}
	}
})