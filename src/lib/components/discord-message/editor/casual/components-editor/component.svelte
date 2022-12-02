<script lang="ts">
	import Collapse from '../collapse.svelte'
	import { Icon } from '$lib/components/icon'
	import type { DiscordMessageComponent } from '$lib/modules/discord'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let idx: number
	export let length: number
	export let component: DiscordMessageComponent

	const moveUp = () => dispatch('moveUp')
	const moveDown = () => dispatch('moveDown')
	const remove = () => dispatch('remove')
	const duplicate = () => dispatch('duplicate')
</script>

<Collapse>
	<h3 slot="header" class="font-bold">
		Component {idx + 1}
		<span class="text-gray-500">({{ 2: 'Button', 3: 'Select Menu' }[component.type]})</span>
	</h3>

	<svelte:fragment slot="buttons">
		{#if idx > 0}
			<button on:click={moveUp}><Icon name="chevron-up" /></button>
		{/if}
		{#if idx < length - 1}
			<button on:click={moveDown}><Icon name="chevron-down" /></button>
		{/if}
		<button on:click={duplicate}><Icon name="copy" /></button>
		<button on:click={remove}><Icon name="cross" /></button>
	</svelte:fragment>

	<div />
</Collapse>
