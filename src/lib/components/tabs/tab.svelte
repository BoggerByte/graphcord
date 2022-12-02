<script lang="ts">
	import { getContext } from 'svelte'

	const { activeTabId } = getContext('tabs')

	export let tabId: string
</script>

{#if $activeTabId === tabId}
	<slot />
{/if}
