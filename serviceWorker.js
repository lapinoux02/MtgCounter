const sw = 'mtg-counter-v10'
const assets = [
	'/MtgCounter/index.html',
	'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.js',
	'/MtgCounter/app.js',
	'/MtgCounter/utils/utils.js',
	'/MtgCounter/utils/memoryManager.js',
	'/MtgCounter/utils/dragDropTouch.js',
	'/MtgCounter/board/board.js',
	'/MtgCounter/playerTile/playerTile.js',
	'/MtgCounter/commanderDamage/commanderDamage.js',
	'/MtgCounter/commanderDamageLine/commanderDamageLine.js',
	'/MtgCounter/gameMenu/gameMenu.js',
	'/MtgCounter/startingLife/startingLife.js',
	'/MtgCounter/playersManager/playersManager.js',
	'/MtgCounter/randomPlayer/randomPlayer.js',
	'/MtgCounter/buttonBar/buttonBar.js',
	'/MtgCounter/playersOption/playersOption.js',
	'/MtgCounter/optionsButton/optionsButton.js',
	'/MtgCounter/parametersMenu/parametersMenu.js',
	'/MtgCounter/dice/dice.js',
	'/MtgCounter/ressources/fonts/style.css',
	'/MtgCounter/ressources/fonts/icomoon.svg',
	'/MtgCounter/ressources/fonts/icomoon.ttf',
	'/MtgCounter/ressources/fonts/icomoon.woff',
	'/MtgCounter/app.css',
	'/MtgCounter/board/board.css',
	'/MtgCounter/playerTile/playerTile.css',
	'/MtgCounter/commanderDamage/commanderDamage.css',
	'/MtgCounter/commanderDamageLine/commanderDamageLine.css',
	'/MtgCounter/gameMenu/gameMenu.css',
	'/MtgCounter/startingLife/startingLife.css',
	'/MtgCounter/playersManager/playersManager.css',
	'/MtgCounter/randomPlayer/randomPlayer.css',
	'/MtgCounter/buttonBar/buttonBar.css',
	'/MtgCounter/playersOption/playersOption.css',
	'/MtgCounter/optionsButton/optionsButton.css',
	'/MtgCounter/parametersMenu/parametersMenu.css',
	'/MtgCounter/dice/dice.css',
	'/MtgCounter/ressources/icon192.png',
	'/MtgCounter/ressources/icon512.png'
];

self.addEventListener('install', installEvent => {
	self.skipWaiting();
	installEvent.waitUntil(
		caches.open(sw).then(cache => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		})
	);
});