<script lang="ts">
	import Collapse from '../collapse.svelte'
	import ActionRowEditor from './action-row.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import emptyDiscordMessageActionRow from '$lib/contents/emptyDiscordMessageActionRow'
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

	$: limitReached = actionRows.length >= 5
</script>

<Collapse>
	<h3 slot="header">
		Components
		<span class="text-gray-500 font-normal">
			({actionRows.length} / 5)
		</span>
	</h3>

	<div class="mb-[4px] flex flex-row gap-2">
		<div class="flex flex-col gap-2" class:flex-grow={actionRows.length > 0}>
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
		<div class:flex-grow={actionRows.length === 0}>
			<button
				on:click={addActionRow}
				class:disabled={limitReached}
				title="Add Action Row"
				class="btn-add"
			>
				<Icon name="plus" />
				{#if actionRows.length === 0}
					<span>Add Action Row</span>
				{/if}
			</button>
		</div>
	</div>
</Collapse>
