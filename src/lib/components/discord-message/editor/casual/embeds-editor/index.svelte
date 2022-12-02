<script lang="ts">
	import Collapse from '../collapse.svelte'
	import EmbedEditor from './embed.svelte'
	import Icon from '$lib/components/icon/index.svelte'
	import type { DiscordMessageEmbed } from '$lib/modules/discord'
	import emptyDiscordMessageEmbed from '$lib/contents/emptyDiscordMessageEmbed'
	import { flip } from 'svelte/animate'
	import { crossfade } from 'svelte/transition'

	const [send, receive] = crossfade({ duration: 600 })

	export let embeds: DiscordMessageEmbed[]

	function moveEmbedUp(idx: number) {
		;[embeds[idx - 1], embeds[idx]] = [embeds[idx], embeds[idx - 1]]
		embeds = embeds
	}
	function moveEmbedDown(idx: number) {
		;[embeds[idx + 1], embeds[idx]] = [embeds[idx], embeds[idx + 1]]
		embeds = embeds
	}
	function addEmbed() {
		embeds.push(structuredClone(emptyDiscordMessageEmbed))
		embeds = embeds
	}
	function removeEmbed(idx: number) {
		embeds.splice(idx, 1)
		embeds = embeds
	}
	function duplicateEmbed(idx: number) {
		embeds.push(structuredClone(embeds[idx]))
		embeds = embeds
	}
</script>

<Collapse isOpen={true}>
	<h3 slot="header">Embeds</h3>
	<div class="mb-[4px] flex flex-row gap-2">
		{#if embeds.length > 0}
			<div class="flex flex-col gap-2 flex-grow">
				{#each embeds as embed, idx (idx)}
					<div animate:flip in:receive|local={{ key: idx }} out:send|local={{ key: idx }}>
						<EmbedEditor
							{idx}
							length={embeds.length}
							bind:embed
							on:moveUp={() => moveEmbedUp(idx)}
							on:moveDown={() => moveEmbedDown(idx)}
							on:remove={() => removeEmbed(idx)}
							on:duplicate={() => duplicateEmbed(idx)}
						/>
					</div>
				{/each}
			</div>
			<div>
				<button on:click={addEmbed} title="Add Embed" class="btn-add">
					<Icon name="plus" />
				</button>
			</div>
		{:else}
			<div class="flex-grow">
				<button on:click={addEmbed} class="btn-add">
					<span class="flex items-center justify-center">
						<Icon name="plus" /> Add embed
					</span>
				</button>
			</div>
		{/if}
	</div>
</Collapse>
