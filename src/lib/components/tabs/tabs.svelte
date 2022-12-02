<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	let activeTabId = writable<string>(undefined)

	setContext('tabs', {
		activeTabId,
		selectTab: (id: string) => activeTabId.set(id)
	})
</script>

<div>
	<div class="mb-2">
		<slot name="headers" />
	</div>
	<div>
		<slot />
	</div>
</div>
