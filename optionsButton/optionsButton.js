Vue.component('optionsButton', {
	data() {
		return {
			open: false
		}
	},
	computed: {
		classes()  {
			return [
				`toggle${PLAYERS.length}`,
				this.open ? 'open' : 'closed'
			].join(' ');
		}
	},
	template: `<div id="optionsButton" :class="classes">
		<div id="optionToggle" v-on:click="toggle"></div>
		<div id="options">
			<div class="option" id="optionsMenu" v-on:click="openGameMenu"></div>
			<div class="option" id="optionsPlayer" v-on:click="openPlayerOptions"></div>
			<div class="option" id="optionsParameters" v-on:click="openParametersMenu"></div>
			<div class="option" id="dice"><div id="diceHolder"><dice></dice></div></div>
		</div>
	</div>`,
	methods: {
		toggle() {
			this.open = !this.open;
		},
		openGameMenu() {
			this.$emit('opengamemenu');
		},
		openPlayerOptions() {
			this.$emit('openplayersoption')
		},
		openParametersMenu() {
			this.$emit('openparametersmenu')
		}
	}
})