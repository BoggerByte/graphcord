<script lang="ts">
	import Collapse from '../../collapse.svelte'
	import FieldEditor from './field.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
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

	$: fieldsLimit = fields.length >= 25
</script>

<Collapse>
	<h3 slot="header">
		Fields
		<span class="text-gray-500 font-normal">
			({fields.length} / 25)
		</span>
	</h3>
	<div class="px-2 flex flex-row gap-1">
		<div class="flex flex-col gap-1" class:flex-grow={fields.length > 0}>
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
		<div class:flex-grow={fields.length === 0}>
			<button on:click={addField} title="Add Field" class="btn-add" class:disabled={fieldsLimit}>
				<Icon name="plus" />
			</button>
		</div>
	</div>
</Collapse>
