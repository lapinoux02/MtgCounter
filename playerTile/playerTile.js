Vue.component('playerTile', {
	props: ['player'],
	computed: {
		commanderDamage() {
			return Math.max(...this.player.commanderDamages.map(cd => cd.damage));
		}
	},
	template: `<div class="playerTile">
		<div class="mainCounter">
			<div class="lifeMinus">-</div>
			<div class="lifePlus">+</div>
			<div class="playerName">{{player.name}}</div>
			<div class="playerLife">{{player.life}}</div>
		</div>
		<div class="annexeCounters">
			<div class="poison">
				<div class="poisonMinus">-</div>
				<div class="poisonPlus">+</div>
				<div class="poisonDamage">{{player.poisonDamage}}</div>
			</div>
			<div class="commanderDamage">{{commanderDamage}}</div>
		</div>
	</div>`,
	methods: {
	}
})