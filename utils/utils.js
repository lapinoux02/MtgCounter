function bzz() {
	navigator.vibrate(50);
}

function addClickHandlers(el, short, long) {
	let firstTempo = 1000;
	let tempo = 500;
	let start = null;
	let interval = null;
	el.addEventListener('touchstart', () => {
		start = new Date().getTime();
		interval = setTimeout(() => {
			bzz();
			long();
			interval = setInterval(() => {
				bzz();
				long();
			}, tempo);
		}, firstTempo);
	});
	el.addEventListener('touchend', () => {
		let diff = new Date().getTime() - start;
		start = null;
		clearInterval(interval);
		if (diff < 1000) {
			bzz();
			short();
		}
	});
}