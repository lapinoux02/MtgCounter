Vue.component('players-option', {
	data() {
		return {
			players: PLAYERS,
			dragged: null,
			draggedIndex: null
		}
	},
	template: `<div id="playersOption" class="menu">
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
					<div class="dndIcon">⠿</div>
					<div class="playerName">{{player.name}}</div>
				</div>
				<div v-on:click="rename(i)">✎</div>
			</div>
		</div>
		<div id="options">
			<randomPlayer></randomPlayer>
		</div>
		<div id="help">
			<div id="mainBlock">
				<div class="tileRow">
					<div class="tile">{{(players.length >> 1) + 1}}</div>
					<div v-if="players.length >= 4" class="tile">{{(players.length >> 1) + 2}}</div>
					<div v-if="players.length === 6" class="tile">{{(players.length >> 1) + 3}}</div>
				</div>
				<div class="tileRow">
					<div v-if="players.length === 6" class="tile">3</div>
					<div v-if="players.length >= 4" class="tile">2</div>
					<div class="tile">1</div>
				</div>
			</div>
			<div v-if="players.length%2" id="sideBlock" class="tile">{{players.length}}</div>
		</div>
		<buttonBar :secondary="back"></buttonBar>
	</div>`,
	methods: {
		dragStart(player, i) {
			this.dragged = player;
			this.draggedIndex = i;
		},
		drop(i) {
			bzz();
			this.players.splice(this.draggedIndex, 1, ...this.players.splice(i, 1, this.dragged))
		},
		rename(i) {
			bzz();
			this.players[i].name = prompt(`Rename ${this.players[i].name}`) || this.players[i].name;
		},
		back() {
			history.back();
		}
	}
})