Vue.component('parameters-menu', {
	data() {
		return {
			conf: CONF,
			vibrations: CONF.vibrations,
			keepScreenAlive: CONF.keepScreenAlive,
			showKeepAwake: 'wakeLock' in navigator || 'keepAwake' in screen,
			theme: CONF.theme,
			vibrationsEnabled: !!navigator.vibrate
		}
	},
	template: `<div id="parametersMenu" class="menu">
		<div id="title">Parameters</div>
		<div id="options">
			<div v-if="vibrationsEnabled" id="vibrationOption" class="menuOption">
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
			<div id="theme" class="menuOption">
				<div class="title">Theme</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="selectTheme('dark')" :class="{active: conf.theme === 'dark'}">Dark</div>
					<div class="rectButton" v-on:click="selectTheme('light')" :class="{active: conf.theme === 'light'}">Light</div>
					<div class="rectButton" v-on:click="selectTheme('flat')" :class="{active: conf.theme === 'flat'}">Flat</div>
					<div class="rectButton" v-on:click="selectTheme('sol')" :class="{active: conf.theme === 'sol'}">Sol</div>
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
		selectTheme(val) {
			bzz();
			CONF.theme = val;
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
			// Gestion du thème
			CONF.theme = this.theme;

			this.$emit('openboard');
		}
	}
})