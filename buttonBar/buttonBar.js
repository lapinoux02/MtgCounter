Vue.component('buttonBar', {
	props: ['secondary', 'primary', 'primaryText', 'secondaryText'],
	template: `<div id="buttons">
		<div v-if="secondary" class="button secondary" v-on:click="secondary">{{secondaryText || 'Back'}}</div>
		<div v-if="primary" class="button primary" v-on:click="primary">{{primaryText || 'OK'}}</div>
	</div>`
})