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
		<div id="optionToggle" v-on:click="toggle" :class="{'icon-menu': !this.open, 'icon-cross': this.open}"></div>
		<div id="options">
			<div class="option" id="optionsMenu" v-on:click="openGameMenu"><span class=" icon-menu"></span></div>
			<div class="option" id="optionsPlayer" v-on:click="openPlayerOptions"><span class=" icon-people"></span></div>
			<div class="option" id="optionsParameters" v-on:click="openParametersMenu"><span class=" icon-gear"></span></div>
			<div class="option" id="dice"><div id="diceHolder"><dice></dice></div></div>
		</div>
	</div>`,
	methods: {
		toggle() {
			bzz();
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