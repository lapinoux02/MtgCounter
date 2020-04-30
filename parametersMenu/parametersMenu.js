Vue.component('parameters-menu', {
	data() {
		return {
			vibrations: CONF.vibrations,
			keepScreenAlive: CONF.keepScreenAlive,
			showKeepAwake: 'wakeLock' in navigator || 'keepAwake' in screen
		}
	},
	template: `<div id="parametersMenu" class="menu">
		<div id="title">Parameters</div>
		<div id="options">
			<div id="vibrationOption" class="menuOption">
				<div class="title">Vibrations</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="selectVibration(false)" :class="{active: !vibrations}">NO</div>
					<div class="rectButton" v-on:click="selectVibration(true)" :class="{active: vibrations}">YES</div>
				</div>
			</div>
			<div v-if="showKeepAwake" id="wakeLock" class="menuOption">
				<div class="title">Keep screen awake</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="selectWakeLock(false)" :class="{active: !keepScreenAlive}">NO</div>
					<div class="rectButton" v-on:click="selectWakeLock(true)" :class="{active: keepScreenAlive}">YES</div>
				</div>
			</div>
		</div>
		<buttonBar :primary="validate" :secondary="cancel" :secondaryText="'Cancel'"></buttonBar>
	</div>`,
	methods: {
		selectVibration(val) {
			bzz();
			this.vibrations = val;
		},
		selectWakeLock(val) {
			bzz();
			this.keepScreenAlive = val;
		},
		validate() {
			// Gestion des vibrations
			CONF.vibrations = this.vibrations;

			// Gestion de l'extinction de l'écran
			this.keepScreenAlive ? wakeLock() : wakeUnlock();

			MM.saveConf();
			this.$emit('openboard');
		},
		cancel() {
			this.$emit('openboard');
		}
	}
})