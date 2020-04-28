Vue.component('dice', {
	data() {
		return {
			number: Math.floor(Math.random()*6) + 1
		}
	},
	template: `<div class="dice" v-on:click="roll">
		<div class="diceSideCol">
			<div :class="{dot: true, on: number !== 1}"></div>
			<div :class="{dot: true, on: number === 6}"></div>
			<div :class="{dot: true, on: number > 3}"></div>
		</div>
		<div class="diceMidCol">
			<div :class="{dot: true, on: number % 2}"></div>
		</div>
		<div class="diceSideCol">
			<div :class="{dot: true, on: number > 3}"></div>
			<div :class="{dot: true, on: number === 6}"></div>
			<div :class="{dot: true, on: number !== 1}"></div>
		</div>
	</div>`,
	methods: {
		roll() {
			this.number = Math.floor(Math.random()*6) + 1;
		}
	}
})