let MM = {
	savePlayers: () => {
		localStorage.setItem('players', JSON.stringify(PLAYERS));
	},
	loadPlayers: () => {
		let memoryPlayers = JSON.parse(localStorage.getItem('players'));
		if (memoryPlayers) {
			PLAYERS.push(...memoryPlayers);
			return true;
		}
	},
	saveConf: () => {
		localStorage.setItem('conf', JSON.stringify(CONF));
	},
	loadConf: () => {
		let memoryConf = JSON.parse(localStorage.getItem('conf'));
		if (memoryConf) {
			Object.assign(CONF, memoryConf);
			return true;
		}
	}
}