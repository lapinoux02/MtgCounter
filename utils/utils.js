function bzz() {
	if (CONF.vibrations && navigator.vibrate) {
		navigator.vibrate(50);
	}
}

function addClickHandlers(el, short, long) {
	let firstTempo = 1000;
	let tempo = 500;
	let start = null;
	let interval = null;
	el.addEventListener('touchstart', () => {
		start = new Date().getTime();
		interval = setTimeout(() => {
			long();
			bzz();
			interval = setInterval(() => {
				long();
				bzz();
			}, tempo);
		}, firstTempo);
	});
	el.addEventListener('touchend', () => {
		let diff = new Date().getTime() - start;
		start = null;
		clearInterval(interval);
		if (diff < 1000) {
			short();
			bzz();
		}
	});
	el.stopClick = () => {
		clearInterval(interval);
		start = null;
	}
}

let WAKE_LOCK = null;
async function wakeLock() {
	CONF.keepScreenAlive = true;
	if ('wakeLock' in navigator) {
		WAKE_LOCK = await navigator.wakeLock.request('screen');
	} else if ('keepAwake' in screen) {
		screen.keepAwake = true;
	}
}

function wakeUnlock() {
	CONF.keepScreenAlive = false;
	if ('wakeLock' in navigator) {
		if (WAKE_LOCK) {
			WAKE_LOCK.release();
			WAKE_LOCK = null;
		}
	} else if ('keepAwake' in screen) {
		screen.keepAwake = false;
	}
}

// Sauvegarde l'ancien state et en crée un nouveau
function newHistoryState(val) {
	history.replaceState(val, '');
	history.pushState(null, window.location.href);
}

// "Minifie" les joueurs en mémoire
function minifiedPlayers() {
	return JSON.stringify(MM.getPlayers().map(p => [
		p.id,
		p.name,
		p.life,
		p.poisonDamage,
		p.commanderDamages.map(cd => [
			cd.id,
			cd.damage
		])
	]));
}

// Recrée une partie à partir de donnée minifiée par la fonction minifiedPlayers()
function inflatePlayers(text) {
	try {
		let players = JSON.parse(text).map(p => ({
			id: p[0],
			name: p[1],
			life: p[2],
			poisonDamage: p[3],
			commanderDamages: p[4].map(cd => ({id: cd[0], damage: cd[1]}))
		}));
		PLAYERS.length = 0;
		PLAYERS.push(...players);
		return true;
	} catch (e) {
		return null;
	}
}