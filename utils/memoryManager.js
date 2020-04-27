let MM = {
	savePlayers: (players) => {
		localStorage.setItem('players', JSON.stringify(players));
	},
	getPlayers: () => {
		return JSON.parse(localStorage.getItem('players'));
	}
}