class Player {
	constructor(id, name) {
		// L'id est aussi l'index dans le tableau des joueurs
		this.id = id;
		this.name = name;
		this.life = 40;
		this.poisonDamage = 0;
		this.commanderDamages = [];
	}
}

const PLAYERS = [];
const registerPlayer = (id, name) => {
	PLAYERS.push(new Player(id, name));
	PLAYERS.forEach(p => Object.assign(p.commanderDamages, PLAYERS.map(pp => ({id: pp.id, damage: 0}))));
}
registerPlayer(0, 'Paul');
registerPlayer(1, 'Bastien');
registerPlayer(2, 'Seboubou');
registerPlayer(3, 'Gaëtanos');
registerPlayer(4, 'Iwan');

new Vue({
	el: '#app',
	data() {
		return {
			players: PLAYERS
		}
	}
})
