Vue.component('playerTile', {
	props: ['player'],
	computed: {
		commanderDamage() {
			return Math.max(...this.player.commanderDamages.map(cd => cd.damage));
		}
	},
	template: `<div class="playerTile"
			draggable
			droppable
			ondragover="event.preventDefault()"
			@dragstart="dragStart"
			@drop="drop">
		<div class="mainCounter">
			<div ref="lifeMinus" class="lifeMinus">-</div>
			<div ref="lifePlus" class="lifePlus">+</div>
			<div class="playerName">{{player.name}}</div>
			<div class="playerLife">{{player.life}}</div>
		</div>
		<div class="annexeCounters">
			<div class="poison">
				<div ref="poisonMinus" class="poisonMinus">-</div>
				<div ref="poisonPlus" class="poisonPlus">+</div>
				<div class="poisonDamage">{{player.poisonDamage}}</div>
			</div>
			<div class="commanderDamage" v-on:click="openCommanderDamage">{{commanderDamage}}</div>
		</div>
	</div>`,
	methods: {
		remove1Life() {
			this.player.life--;
		},
		remove5Life() {
			this.player.life -= 5;
		},
		add1Life() {
			this.player.life++;
		},
		add5Life() {
			this.player.life += 5;
		},
		remove1Poison() {
			this.player.poisonDamage--;
		},
		remove5Poison() {
			this.player.poisonDamage -= 5;
		},
		add1Poison() {
			this.player.poisonDamage++;
		},
		add5Poison() {
			this.player.poisonDamage += 5;
		},
		openCommanderDamage() {
			this.$emit('opencommanderdamage', this.player);
		},
		dragStart(e) {
			stopClick();
			this.$emit('dragstart');
		},
		drop(i) {
			this.$emit('drop');
		}
	},
	mounted() {
		addClickHandlers(this.$refs.lifeMinus, this.remove1Life, this.remove5Life);
		addClickHandlers(this.$refs.lifePlus, this.add1Life, this.add5Life);
		addClickHandlers(this.$refs.poisonMinus, this.remove1Poison, this.remove5Poison);
		addClickHandlers(this.$refs.poisonPlus, this.add1Poison, this.add5Poison);
	}
})