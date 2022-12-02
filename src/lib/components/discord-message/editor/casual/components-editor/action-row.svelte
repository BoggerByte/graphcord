<script lang="ts">
	import Collapse from '../collapse.svelte'
	import ComponentEditor from './component/index.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import type { DiscordActionRow } from '$lib/modules/discord'
	import defaultDiscordMessageComponents from '$lib/contents/defaultDiscordMessageComponents'
	import { createEventDispatcher } from 'svelte'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { slide } from 'svelte/transition'

	const [send, receive] = crossfade({ duration: 600 })

	const dispatch = createEventDispatcher()

	export let idx: number
	export let length: number
	export let actionRow: DiscordActionRow

	const moveUp = () => dispatch('moveUp')
	const moveDown = () => dispatch('moveDown')
	const remove = () => dispatch('remove')
	const duplicate = () => dispatch('duplicate')

	function moveComponentUp(idx: number) {
		;[actionRow.components[idx - 1], actionRow.components[idx]] = [
			actionRow.components[idx],
			actionRow.components[idx - 1]
		]
		actionRow.components = actionRow.components
	}
	function moveComponentDown(idx: number) {
		;[actionRow.components[idx + 1], actionRow.components[idx]] = [
			actionRow.components[idx],
			actionRow.components[idx + 1]
		]
		actionRow.components = actionRow.components
	}
	function removeComponent(idx: number) {
		actionRow.components.splice(idx, 1)
		actionRow.components = actionRow.components
	}
	function duplicateComponent(idx: number) {
		actionRow.components.push(structuredClone(actionRow.components[idx]))
		actionRow.components = actionRow.components
	}
	function addComponent(
		type:
			| 'button'
			| 'string-select'
			| 'user-select'
			| 'role-select'
			| 'mentionable-select'
			| 'channel-select'
	) {
		actionRow.components.push(structuredClone(defaultDiscordMessageComponents[type]))
		actionRow.components = actionRow.components
	}

	let isOpen = false

	$: actionRowLimit = length >= 5
	$: buttonRow = actionRow.components.length > 0 && actionRow.components.every((c) => c.type === 2)
	$: buttonsLimit = buttonRow && actionRow.components.length >= 5
	$: selectRow =
		actionRow.components.length > 0 &&
		actionRow.components.every((c) => [3, 5, 6, 7, 8].includes(c.type))
	$: selectLimit = selectRow && actionRow.components.length >= 1
</script>

<style lang="postcss">
	.menu-add {
		@apply absolute p-2 flex flex-col gap-1 items-start;

		button {
			@apply px-1 py-0.5
					shadow-md
					rounded bg-gray-900;

			&.disabled {
				@apply opacity-50
						pointer-events-none cursor-not-allowed;
			}
		}
	}
</style>

<section class="p-2 rounded bg-gray-800">
	<Collapse>
		<h3 slot="header" class="font-bold">
			{#if buttonRow}
				Buttons Row
				<span class="text-gray-500 font-normal">
					({actionRow.components.length} / 5)
				</span>
			{:else if selectRow}
				Select Row
			{:else}
				Action Row
			{/if}
		</h3>

		<svelte:fragment slot="buttons">
			{#if idx > 0}
				<button on:click={moveUp}><Icon name="chevron-up" /></button>
			{/if}
			{#if idx < length - 1}
				<button on:click={moveDown}><Icon name="chevron-down" /></button>
			{/if}
			<button class="btn-collapse" class:disabled={actionRowLimit} on:click={duplicate}>
				<Icon name="copy" />
			</button>
			<button on:click={remove}><Icon name="cross" /></button>
		</svelte:fragment>

		<div class="mb-[4px] flex flex-row gap-2">
			<div class="flex flex-col gap-2" class:flex-grow={actionRow.components.length > 0}>
				{#each actionRow.components as component, idx (idx)}
					<div animate:flip in:receive|local={{ key: idx }} out:send|local={{ key: idx }}>
						<ComponentEditor
							{idx}
							length={actionRow.components.length}
							bind:component
							on:moveUp={() => moveComponentUp(idx)}
							on:moveDown={() => moveComponentDown(idx)}
							on:remove={() => removeComponent(idx)}
							on:duplicate={() => duplicateComponent(idx)}
						/>
					</div>
				{/each}
			</div>
			<div class:flex-grow={actionRow.components.length === 0}>
				<button
					class:disabled={buttonsLimit || selectLimit}
					on:click={() => (isOpen = !isOpen)}
					title="Add Component"
					class="btn-add"
				>
					<Icon name="plus" />
					{#if actionRow.components.length === 0}
						<span>Add component</span>
					{/if}
				</button>
				{#if isOpen}
					<div
						class="menu-add"
						transition:slide={{ duration: 350 }}
						on:click={() => (isOpen = false)}
					>
						<button
							class:disabled={selectRow || buttonsLimit}
							on:click={() => addComponent('button')}
						>
							Button
						</button>
						<button
							class:disabled={buttonRow || selectLimit}
							class="px-1 py-0.5"
							on:click={() => addComponent('string-select')}
						>
							String Select
						</button>
						<button
							class:disabled={buttonRow || selectLimit}
							class="px-1 py-0.5"
							on:click={() => addComponent('user-select')}
						>
							User Select
						</button>
						<button
							class:disabled={buttonRow || selectLimit}
							class="px-1 py-0.5"
							on:click={() => addComponent('role-select')}
						>
							Role Select
						</button>
						<button
							class:disabled={buttonRow || selectLimit}
							class="px-1 py-0.5"
							on:click={() => addComponent('mentionable-select')}
						>
							Mentionable Select
						</button>
						<button
							class:disabled={buttonRow || selectLimit}
							class="px-1 py-0.5"
							on:click={() => addComponent('channel-select')}
						>
							Channel Select
						</button>
					</div>
				{/if}
			</div>
		</div>
	</Collapse>
</section>
