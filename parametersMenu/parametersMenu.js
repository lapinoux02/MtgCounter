Vue.component('parameters-menu', {
	data() {
		return {
			vibrations: CONF.vibrations
		}
	},
	template: `<div id="parametersMenu" class="menu">
		<div id="title">Parameters</div>
		<div id="options">
			<div id="vibrationOption" class="menuOption">
				<div class="title">Vibrations</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="select(false)" :class="getClass(false)">NO</div>
					<div class="rectButton" v-on:click="select(true)" :class="getClass(true)">YES</div>
				</div>
			</div>
		</div>
		<buttonBar :primary="validate" :secondary="cancel" :secondaryText="'Cancel'"></buttonBar>
	</div>`,
	methods: {
		select(val) {
			this.vibrations = val;
		},
		getClass(val) {
			return val === this.vibrations ? 'active' : '';
		},
		validate() {
			CONF.vibrations = this.vibrations;
			this.$emit('openboard');
		},
		cancel() {
			this.$emit('openboard');
		}
	}
})