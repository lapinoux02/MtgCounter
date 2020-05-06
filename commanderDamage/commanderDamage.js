Vue.component('commander-damage', {
	props: ['player'],
	data() {
		return {
			tmpData: this.player.commanderDamages.map(e => ({id: e.id, damage: e.damage}))
		}
	},
	template: `<div id="cd">
		<div id="title">Commander damage</div>
		<div id="lines">
			<commanderDamageLine v-for="cd in tmpData" :cd="cd" :key="cd.id"></commanderDamageLine>
		</div>
		<buttonBar :primary="ok" :secondary="cancel"></buttonBar>
	</div>`,
	methods: {
		ok() {
			let red = (a, cd) => a + cd.damage;
			this.player.life -= this.tmpData.reduce(red, 0) - this.player.commanderDamages.reduce(red, 0);
			this.player.commanderDamages.length = 0;
			this.player.commanderDamages.push(...this.tmpData);
			this.$emit('openboard');
		},
		cancel() {
			this.$emit('openboard');
		}
	}
})