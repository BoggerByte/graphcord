<script lang="ts">
	import Collapse from '../../../collapse.svelte'
	import TextCounter from '../../../text-counter.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import { createEventDispatcher } from 'svelte'
	import type { DiscordStringSelect } from '$lib/modules/discord'

	const dispatch = createEventDispatcher()

	export let idx: number
	export let length: number
	export let option: DiscordStringSelect['options'][0]

	const moveUp = () => dispatch('moveUp')
	const moveDown = () => dispatch('moveDown')
	const remove = () => dispatch('remove')
	const duplicate = () => dispatch('duplicate')

	$: optionsLimit = length >= 25;
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
		<button class="btn-collapse" class:disabled={optionsLimit} on:click={duplicate}>
			<Icon name="copy" />
		</button>
		<button on:click={remove}><Icon name="cross" /></button>
	</svelte:fragment>

	<div class="flex gap-2">
		<div class="form-group required">
			<label>Label <TextCounter text={option.label} maxlength="100" /></label>
			<input type="text" bind:value={option.label} />
		</div>
		<div class="form-group">
			<label>Emoji</label>
			<input type="color" />
		</div>
	</div>
	<div class="form-group required">
		<label>Value <TextCounter text={option.value} maxlength="100" /></label>
		<input type="text" bind:value={option.value} />
	</div>
	<div class="form-group">
		<label>Description <TextCounter text={option.description} maxlength="100" /></label>
		<input type="text" bind:value={option.description} />
	</div>
	<div class="form-group">
		<label>Default</label>
		<input type="checkbox" bind:checked={option.default} />
	</div>
</Collapse>
