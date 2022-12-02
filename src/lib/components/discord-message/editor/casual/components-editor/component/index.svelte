<script lang="ts">
	import Collapse from '../../collapse.svelte'
	import ButtonEditor from './buttton.svelte'
	import StringSelectEditor from './string-select/index.svelte'
	import UserSelectEditor from './user-select.svelte'
	import RoleSelectEditor from './role-select.svelte'
	import MentionableSelectEditor from './mentionable-select.svelte'
	import ChannelSelectEditor from './channel-select.svelte'
	import Icon from '$lib/components/icon/index.svelte'
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

	$: componentTypeName = {
		2: 'Button',
		3: 'Select Menu',
		5: 'User Select',
		6: 'Role Select',
		7: 'Mentionable Select',
		8: 'Channel Select'
	}[component.type]

	$: buttonsLimit = component.type === 2 && length >= 5
	$: selectLimit = [3, 5, 6, 7, 8].includes(component.type) && length >= 1
</script>

<Collapse>
	<h3 slot="header" class="font-bold">
		{componentTypeName}
		{idx + 1}
	</h3>

	<svelte:fragment slot="buttons">
		{#if idx > 0}
			<button on:click={moveUp}><Icon name="chevron-up" /></button>
		{/if}
		{#if idx < length - 1}
			<button on:click={moveDown}><Icon name="chevron-down" /></button>
		{/if}
		<button class="btn-collapse" class:disabled={buttonsLimit || selectLimit} on:click={duplicate}>
			<Icon name="copy" />
		</button>
		<button on:click={remove}><Icon name="cross" /></button>
	</svelte:fragment>

	<div class="form-group required">
		<label>Custom ID</label>
		<input bind:value={component.custom_id} type="text" />
	</div>
	<hr />
	{#if component.type === 2}
		<ButtonEditor bind:component />
	{/if}
	{#if component.type === 3}
		<StringSelectEditor bind:component />
	{/if}
	{#if component.type === 5}
		<UserSelectEditor bind:component />
	{/if}
	{#if component.type === 6}
		<RoleSelectEditor bind:component />
	{/if}
	{#if component.type === 7}
		<MentionableSelectEditor bind:component />
	{/if}
	{#if component.type === 8}
		<ChannelSelectEditor bind:component />
	{/if}
</Collapse>
