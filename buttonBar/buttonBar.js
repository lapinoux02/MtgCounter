Vue.component('buttonBar', {
	props: ['secondary', 'primary'],
	template: `<div id="buttons">
		<div class="button secondary" v-on:click="secondary">Back</div>
		<div class="button primary" v-on:click="primary">OK</div>
	</div>`
})