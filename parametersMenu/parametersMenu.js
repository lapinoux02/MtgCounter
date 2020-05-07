Vue.component('parameters-menu', {
	data() {
		return {
			conf: CONF,
			showKeepAwake: 'wakeLock' in navigator || 'keepAwake' in screen,
			vibrationsEnabled: !!navigator.vibrate
		}
	},
	template: `<div id="parametersMenu" class="menu">
		<div id="title">Parameters</div>
		<div id="options">
			<div v-if="vibrationsEnabled" id="vibrationOption" class="menuOption">
				<div class="title">Vibrations</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="selectVibration(false)" :class="{active: !conf.vibrations}">NO</div>
					<div class="rectButton" v-on:click="selectVibration(true)" :class="{active: conf.vibrations}">YES</div>
				</div>
			</div>
			<div v-if="showKeepAwake" id="wakeLock" class="menuOption">
				<div class="title">Keep screen awake</div>
				<div class="buttonsLine">
					<div class="rectButton" v-on:click="selectWakeLock(false)" :class="{active: !conf.keepScreenAlive}">NO</div>
					<div class="rectButton" v-on:click="selectWakeLock(true)" :class="{active: conf.keepScreenAlive}">YES</div>
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
		<buttonBar :secondary="back"></buttonBar>
	</div>`,
	methods: {
		selectVibration(val) {
			CONF.vibrations = val;
			MM.saveConf();
			bzz();
		},
		selectWakeLock(val) {
			bzz();
			CONF.keepScreenAlive = val;
			MM.saveConf();
		},
		selectTheme(val) {
			bzz();
			CONF.theme = val;
			MM.saveConf();
		},
		back() {
			this.$emit('openboard');
		}
	}
})