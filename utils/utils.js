function bzz() {
	if (CONF.vibrations && navigator.vibrate) {
		navigator.vibrate(50);
	}
}

let firstTempo = 1000;
let tempo = 500;
class Touch {
	constructor(touch, long) {
		this.start = new Date().getTime();
		this.touchId = touch.identifier;
		this.interval = setTimeout(() => {
			long();
			bzz();
			this.interval = setInterval(() => {
				long();
				bzz();
			}, tempo);
		}, firstTempo);
	}
}

let touches = [];
function addClickHandlers(el, short, long) {
	el.addEventListener('touchstart', (event) => {
		touches.push(...[...event.touches].map(touch => new Touch(touch, long)));
	});
	el.addEventListener('touchend', (event) => {
		if (!touches.length) return; // Cas où on a vidé la liste des touches à cause d'un drag
		[...event.changedTouches].forEach(touch => {
			let touchIndex = touches.findIndex(t => t.touchId === touch.identifier);
			let diff = new Date().getTime() - touches[touchIndex].start;
			clearInterval(touches[touchIndex].interval);
			touches.splice(touchIndex, 1);
			if (diff < firstTempo) {
				short();
				bzz();
			}
		});
	});
}
function stopClick() {
	touches.forEach(touch => clearInterval(touch.interval));
	touches.length = 0;
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