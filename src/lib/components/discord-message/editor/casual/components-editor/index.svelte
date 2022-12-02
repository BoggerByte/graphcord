<script lang="ts">
	import Collapse from '../collapse.svelte'
	import ActionRowEditor from './action-row.svelte'
	import { Icon } from '$lib/components/icon'
	import emptyDiscordMessageActionRow from '../../../../../contents/emptyDiscordMessageActionRow'
	import type { DiscordActionRow } from '$lib/modules/discord'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	const [send, receive] = crossfade({ duration: 600 })

	export let actionRows: DiscordActionRow[]

	function moveActionRowUp(idx: number) {
		;[actionRows[idx - 1], actionRows[idx]] = [actionRows[idx], actionRows[idx - 1]]
		actionRows = actionRows
	}
	function moveActionRowDown(idx: number) {
		;[actionRows[idx + 1], actionRows[idx]] = [actionRows[idx], actionRows[idx + 1]]
		actionRows = actionRows
	}
	function addActionRow() {
		actionRows.push(structuredClone(emptyDiscordMessageActionRow))
		actionRows = actionRows
	}
	function removeActionRow(idx: number) {
		actionRows.splice(idx, 1)
		actionRows = actionRows
	}
	function duplicateActionRow(idx: number) {
		actionRows.push(structuredClone(actionRows[idx]))
		actionRows = actionRows
	}
</script>

<Collapse>
	<h3 slot="header">Components</h3>
	<div class="mb-[4px] flex flex-row gap-2">
		{#if actionRows.length > 0}
			<div class="flex flex-col gap-2 flex-grow">
				{#each actionRows as actionRow, idx (idx)}
					<div animate:flip in:receive|local={{ key: idx }} out:send|local={{ key: idx }}>
						<ActionRowEditor
							{idx}
							length={actionRows.length}
							bind:actionRow
							on:moveUp={() => moveActionRowUp(idx)}
							on:moveDown={() => moveActionRowDown(idx)}
							on:remove={() => removeActionRow(idx)}
							on:duplicate={() => duplicateActionRow(idx)}
						/>
					</div>
				{/each}
			</div>
			<div>
				<button
					on:click={addActionRow}
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
					on:click={addActionRow}
					class="w-full p-[5px]
							rounded
							bg-indigo-500"
				>
					<span class="flex items-center justify-center">
						<Icon name="plus" /> Add Action Row
					</span>
				</button>
			</div>
		{/if}
	</div>
</Collapse>
