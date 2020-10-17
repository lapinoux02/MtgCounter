Vue.component('commanderDamage', {
	props: ['player'],
	data() {
		return {
			tmpData: this.player.commanderDamages.map(e => ({id: e.id, damage: e.damage}))
		}
	},
	template: `<div class="cd">
		<commanderDamageLine v-for="cd in player.commanderDamages" :cd="cd" :player="player" :key="cd.id"></commanderDamageLine>
	</div>`,
	methods: {
		close() {
			let red = (a, cd) => a + cd.damage;
			this.player.life -= this.tmpData.reduce(red, 0) - this.player.commanderDamages.reduce(red, 0);
			this.player.commanderDamages.length = 0;
			this.player.commanderDamages.push(...this.tmpData);
			this.$emit('closeCommanderDamage');
		}
	}
})