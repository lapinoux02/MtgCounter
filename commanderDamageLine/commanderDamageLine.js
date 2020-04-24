Vue.component('commanderDamageLine', {
	props: ['cd'],
	template: `<div class="line">
		<div class="cdName">{{cd.name}}</div>
		<div class="counter">
			<div class="cdMinus" ref="cdMinus">-</div>
			<div class="cdDamage">{{cd.damage}}</div>
			<div class="cdPlus" ref="cdPlus">+</div>
		</div>
	</div>`,
	methods: {
		remove1damage() {
			this.cd.damage--;
		},
		remove5damage() {
			this.cd.damage -= 5;
		},
		add1damage() {
			this.cd.damage++;
		},
		add5damage() {
			this.cd.damage += 5;
		}
	},
	mounted() {
		addClickHandlers(this.$refs.cdMinus, this.remove1damage, this.remove5damage);
		addClickHandlers(this.$refs.cdPlus, this.add1damage, this.add5damage);
	}
})