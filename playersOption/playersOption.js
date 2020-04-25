Vue.component('players-option', {
	data() {
		return {
			players: PLAYERS,
			dragged: null,
			draggedIndex: null
		}
	},
	template: `<div id="playersOption">
		<div id="title">Players</div>
		<div id="players">
			<div v-for="(player, i) in players"
				draggable
				droppable
				ondragover="event.preventDefault()"
				@dragstart="dragStart(player, i)"
				@drop="drop(i)"
				class="playerLine"
				:key="i"
			>
				<div class="playerLineLeftPart">
					<div>⠿</div>
					<div class="playerName">{{player.name}}</div>
				</div>
				<div v-on:click="rename(i)">🖉</div>
			</div>
		</div>
		<buttonBar :secondary="cancel"></buttonBar>
	</div>`,
	methods: {
		dragStart(player, i) {
			this.dragged = player;
			this.draggedIndex = i;
		},
		drop(i) {
			this.players.splice(this.draggedIndex, 1, ...this.players.splice(i, 1, this.dragged))
		},
		rename(i) {
			this.players[i].name = prompt(`Renomer ${this.players[i].name}`) || this.players[i].name;
		},
		cancel() {
			this.$emit('opengamemenu');
		}
	}
})