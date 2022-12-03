<script lang="ts">
	import Collapse from '../../collapse.svelte'
	import TextCounter from '../../text-counter.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import type { DiscordEmbedField } from '$lib/modules/discord'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let idx: number
	export let length: number
	export let field: DiscordEmbedField

	const moveUp = () => dispatch('moveUp')
	const moveDown = () => dispatch('moveDown')
	const remove = () => dispatch('remove')
</script>

<Collapse>
	<h3 slot="header">Field {idx + 1}</h3>

	<svelte:fragment slot="buttons">
		{#if idx > 0}
			<button on:click={moveUp}><Icon name="chevron-up" /></button>
		{/if}
		{#if idx < length - 1}
			<button on:click={moveDown}><Icon name="chevron-down" /></button>
		{/if}
		<button on:click={remove}><Icon name="cross" /></button>
	</svelte:fragment>

	<div class="form-group">
		<label>Inline</label>
		<input type="checkbox" bind:checked={field.inline} />
	</div>
	<div class="form-group">
		<label>Name <TextCounter text={field.name} maxlength="256" /></label>
		<input maxlength="256" bind:value={field.name} />
	</div>
	<div class="form-group">
		<label>Text <TextCounter text={field.value} maxlength="1024" /></label>
		<textarea maxlength="1024" bind:value={field.value} style="height: 100px" />
	</div>
</Collapse>
