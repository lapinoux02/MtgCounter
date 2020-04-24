Vue.component('playersManager', {
	data() {
		return {
			players: PLAYERS
		}
	},
	template: `<div id="playersManager">
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
			return this.players.length === num ? 'active' : '';
		},
		select(num) {
			let length = this.players.length;
			if (length > num) {
				for (let i = num; i < length; i++) {
					this.players.pop();
				}
			} else {
				for (let i = length + 1; i <= num; i++) {
					registerPlayer(i-1, `Player ${i}`);
				}
			}
		}
	}
})