<script lang="ts">
	import Collapse from '../collapse.svelte'
	import ComponentEditor from './component.svelte'
	import { Icon } from '$lib/components/icon'
	import type { DiscordActionRow } from '$lib/modules/discord'
	import defaultDiscordMessageComponents from '$lib/contents/defaultDiscordMessageComponents'
	import { createEventDispatcher } from 'svelte'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'

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
	function addComponent(type: 'button' | 'select-menu') {
		actionRow.components.push(structuredClone(defaultDiscordMessageComponents[type]))
		actionRow.components = actionRow.components
	}
</script>

<section class="p-2 rounded bg-gray-800">
	<Collapse>
		<h3 slot="header" class="font-bold">Action Row {idx + 1}</h3>

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

		<div class="mb-[4px] flex flex-row gap-2">
			{#if actionRow.components.length > 0}
				<div class="flex flex-col gap-2 flex-grow">
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
				<div>
					<button
						on:click={() => addComponent('button')}
						class="w-full p-[5px]
							rounded
							bg-indigo-500"
					>
						<Icon name="plus" />
					</button>
				</div>
			{:else}
				<div class="flex-grow">
					<button
						on:click={() => addComponent('button')}
						class="w-full p-[5px]
							rounded
							bg-indigo-500"
					>
						<span class="flex items-center justify-center">
							<Icon name="plus" /> Add Component
						</span>
					</button>
				</div>
			{/if}
		</div>
	</Collapse>
</section>
