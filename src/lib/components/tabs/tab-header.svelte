<script lang="ts">
	import { getContext, onMount } from 'svelte'

	const { activeTabId, selectTab } = getContext('tabs')

	export let tabId: string
	export let header: string
	export let active = false

	onMount(() => {
		if (active) selectTab(tabId)
	})
</script>

{#if header}
	<button
		class="{$$props.class} sm:px-6 px-4 py-1 rounded bg-none"
		class:bg-indigo-500={$activeTabId === tabId}
		on:click={() => selectTab(tabId)}
	>
		{header}
	</button>
{:else}
	<slot active={$activeTabId} select={() => selectTab(tabId)} />
{/if}
