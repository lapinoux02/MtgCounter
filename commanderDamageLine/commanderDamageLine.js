Vue.component('commanderDamageLine', {
	props: ['cd', 'player'],
	template: `<div class="line">
		<div class="cdName">{{getName(cd.id)}}</div>
		<div class="cdLineCounter">
			<div class="cdMinus" ref="cdMinus">-</div>
			<div class="cdDamage">{{cd.damage}}</div>
			<div class="cdPlus" ref="cdPlus">+</div>
		</div>
	</div>`,
	methods: {
		remove1damage() {
			this.cd.damage--;
			this.player.life++;
		},
		remove5damage() {
			this.cd.damage -= 5;
			this.player.life += 5;
		},
		add1damage() {
			this.cd.damage++;
			this.player.life--;
		},
		add5damage() {
			this.cd.damage += 5;
			this.player.life -= 5;
		},
		getName(id) {
			return PLAYERS.filter(p => p.id === id)[0].name;
		}
	},
	mounted() {
		addClickHandlers(this.$refs.cdMinus, this.remove1damage, this.remove5damage);
		addClickHandlers(this.$refs.cdPlus, this.add1damage, this.add5damage);
	}
})