let MM = {
	savePlayers: () => {
		localStorage.setItem('players', JSON.stringify(PLAYERS));
	},
	getPlayers: () => JSON.parse(localStorage.getItem('players')),
	loadPlayers: () => {
		let memoryPlayers = JSON.parse(localStorage.getItem('players'));
		if (memoryPlayers) {
			PLAYERS.length = 0;
			PLAYERS.push(...memoryPlayers);
			return true;
		}
	},
	saveConf: () => {
		localStorage.setItem('conf', JSON.stringify(CONF));
	},
	getConf: () => JSON.parse(localStorage.getItem('conf')),
	loadConf: () => {
		let memoryConf = JSON.parse(localStorage.getItem('conf'));
		if (memoryConf) {
			Object.assign(CONF, memoryConf);
			return true;
		}
	}
}