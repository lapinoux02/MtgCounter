Vue.component('startingLife', {
	props: ['gameData'],
	template: `<div id="startingLife">
		<div class="title">Starting life</div>
		<div class="buttonsLine">
			<div ref="remove10" class="squareButton"><<</div>
			<div ref="remove1" class="squareButton"><</div>
			<div class="data">{{gameData.startingLife}}</div>
			<div ref="add1" class="squareButton">></div>
			<div ref="add10" class="squareButton">>></div>
		</div>
	</div>`,
	methods: {
		remove10Life() {
			this.gameData.startingLife -= 10;
		},
		remove1Life() {
			this.gameData.startingLife--;
		},
		add10Life() {
			this.gameData.startingLife += 10;
		},
		add1Life() {
			this.gameData.startingLife++;
		}
	},
	mounted() {
		addClickHandlers(this.$refs.remove10, this.remove10Life, this.remove10Life);
		addClickHandlers(this.$refs.remove1, this.remove1Life, this.remove1Life);
		addClickHandlers(this.$refs.add10, this.add10Life, this.add10Life);
		addClickHandlers(this.$refs.add1, this.add1Life, this.add1Life);
	}
})