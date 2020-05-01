const sw = 'mtg-counter-v5'
const assets = [
	'index.html',
	'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.js',
	'app.js',
	'/utils/utils.js',
	'/utils/memoryManager.js',
	'/utils/dragDropTouch.js',
	'/board/board.js',
	'/playerTile/playerTile.js',
	'/commanderDamage/commanderDamage.js',
	'/commanderDamageLine/commanderDamageLine.js',
	'/gameMenu/gameMenu.js',
	'/startingLife/startingLife.js',
	'/playersManager/playersManager.js',
	'/randomPlayer/randomPlayer.js',
	'/buttonBar/buttonBar.js',
	'/playersOption/playersOption.js',
	'/parametersMenu/parametersMenu.js',
	'/dice/dice.js',
	'/app.css',
	'/board/board.css',
	'/playerTile/playerTile.css',
	'/commanderDamage/commanderDamage.css',
	'/commanderDamageLine/commanderDamageLine.css',
	'/gameMenu/gameMenu.css',
	'/startingLife/startingLife.css',
	'/playersManager/playersManager.css',
	'/randomPlayer/randomPlayer.css',
	'/buttonBar/buttonBar.css',
	'/playersOption/playersOption.css',
	'/parametersMenu/parametersMenu.css',
	'/dice/dice.css',
	'/ressources/2players.png',
	'/ressources/3players.png',
	'/ressources/4players.png',
	'/ressources/5players.png',
	'/ressources/6players.png',
	'/ressources/icon192.png',
	'/ressources/icon512.png',
	'/ressources/cross.png',
	'/ressources/menu.png',
	'/ressources/optionButton.png',
	'/ressources/parametersButton.png',
	'/ressources/playersButton.png'
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