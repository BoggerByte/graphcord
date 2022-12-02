<script lang="ts">
	import Collapse from '../../collapse.svelte'
	import FieldEditor from './field.svelte'
	import { Icon } from '$lib/components/icon'
	import { flip } from 'svelte/animate'
	import { crossfade } from 'svelte/transition'
	import type { DiscordEmbedField } from '$lib/modules/discord'

	const [send, receive] = crossfade({ duration: 600 })

	export let fields: DiscordEmbedField[]

	function moveFieldUp(idx: number) {
		;[fields[idx - 1], fields[idx]] = [fields[idx], fields[idx - 1]]
		fields = fields
	}
	function moveFieldDown(idx: number) {
		;[fields[idx + 1], fields[idx]] = [fields[idx], fields[idx + 1]]
		fields = fields
	}
	function addField() {
		fields.push({
			name: 'name',
			value: 'value',
			inline: false
		})
		fields = fields
	}
	function removeField(idx: number) {
		fields.splice(idx, 1)
		fields = fields
	}
</script>

<Collapse>
	<h3 slot="header">
		Fields
		<span class="italic">({fields.length})</span>
	</h3>
	<div class="px-2 flex flex-row gap-1">
		{#if fields.length > 0}
			<div class="flex flex-col gap-1 flex-grow">
				{#each fields as field, idx (idx)}
					<div animate:flip in:receive|local={{ key: idx }} out:send|local={{ key: idx }}>
						<FieldEditor
							{idx}
							length={fields.length}
							bind:field
							on:moveUp={() => moveFieldUp(idx)}
							on:moveDown={() => moveFieldDown(idx)}
							on:remove={() => removeField(idx)}
						/>
					</div>
				{/each}
			</div>
			<div>
				<button on:click={() => addField()} style="padding: 5px">
					<Icon name="plus" />
				</button>
			</div>
		{:else}
			<div class="flex-grow">
				<button on:click={() => addField()} style="width: 100%">
					<Icon name="plus" /> Add field
				</button>
			</div>
		{/if}
	</div>
</Collapse>
