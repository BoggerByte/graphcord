<script lang="ts">
	import Collapse from '../../../collapse.svelte'
	import OptionEditor from './option.svelte'
	import type { DiscordStringSelect } from '$lib/modules/discord'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import Icon from "$lib/components/icon/index.svelte";

	const [send, receive] = crossfade({ duration: 600 })

	export let component: DiscordStringSelect

	function moveOptionUp(idx: number) {
		;[component.options[idx - 1], component.options[idx]] = [
			component.options[idx],
			component.options[idx - 1]
		]
		component.options = component.options
	}
	function moveOptionDown(idx: number) {
		;[component.options[idx + 1], component.options[idx]] = [
			component.options[idx],
			component.options[idx + 1]
		]
		component.options = component.options
	}
	function addOption() {
		component.options.push({
			label: 'Option',
			value: 'value'
		})
		component.options = component.options
	}
	function removeOption(idx: number) {
		component.options.splice(idx, 1)
		component.options = component.options
	}
	function duplicateOption(idx: number) {
		component.options.push(structuredClone(component.options[idx]))
		component.options = component.options
	}

	$: optionsLimit = component.options.length >= 25
</script>

<div class="flex flex-col gap-[4px]">
	<Collapse>
		<h3 slot="header">
			Options
			<span class="text-gray-500 font-normal">
				({component.options.length} / 25)
			</span>
		</h3>

		<div class="px-2 flex flex-row gap-1">
			<div class="flex flex-col gap-1" class:flex-grow={component.options.length > 0}>
				{#each component.options as option, idx (idx)}
					<div animate:flip in:receive|local={{ key: idx }} out:send|local={{ key: idx }}>
						<OptionEditor
							{idx}
							length={component.options.length}
							bind:option
							on:moveUp={() => moveOptionUp(idx)}
							on:moveDown={() => moveOptionDown(idx)}
							on:remove={() => removeOption(idx)}
							on:duplicate={() => duplicateOption(idx)}
						/>
					</div>
				{/each}
			</div>
			<div class:flex-grow={component.options.length === 0}>
				<button
					on:click={addOption}
					title="Add Field"
					class="btn-add"
					class:disabled={optionsLimit}
				>
					{#if component.options.length === 0}
						<span>Add Action Row</span>
					{/if}<Icon name="plus" />
				</button>
			</div>
		</div>
	</Collapse>
	<hr />
	<div class="form-group mt-2">
		<label>Placeholder</label>
		<input bind:value={component.placeholder} type="text" />
	</div>
	<div class="flex gap-2">
		<div class="form-group">
			<label>Min Values</label>
			<input bind:value={component.min_values} type="number" />
		</div>
		<div class="form-group">
			<label>Max Values</label>
			<input bind:value={component.max_values} type="number" />
		</div>
	</div>
	<div class="form-group">
		<label>Disabled</label>
		<input bind:checked={component.disabled} type="checkbox" />
	</div>
</div>
