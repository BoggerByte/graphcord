<script lang="ts">
	import Collapse from '../collapse.svelte'
	import FieldsEditor from './fields/index.svelte'
	import TextCounter from '../text-counter.svelte'
	import ColorPicker from '../color-picker.svelte'
	import { Icon } from '$lib/components/icon'
	import type { DiscordMessageEmbed } from '$lib/modules/discord'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let idx: number
	export let length: number
	export let embed: DiscordMessageEmbed

	const moveUp = () => dispatch('moveUp')
	const moveDown = () => dispatch('moveDown')
	const remove = () => dispatch('remove')
	const duplicate = () => dispatch('duplicate')

	function formatHeader(embed: DiscordMessageEmbed): string {
		if (embed.author?.name) {
			return embed.author.name
		} else if (embed.title) {
			return embed.title
		} else if (embed.description) {
			return embed.description
		} else if (embed.footer?.text) {
			return embed.footer.text
		} else {
			return ''
		}
	}

	$: header = formatHeader(embed)
</script>

<style lang="postcss">
	.embed-editor {
		border-left-width: 4px;
		border-left-color: var(--border-color);
	}
</style>

<section class="embed-editor p-2 rounded bg-gray-800" style="--border-color: {embed.color}">
	<Collapse>
		<h3 slot="header" class="font-bold">Embed {idx + 1} — {header}</h3>

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

		<Collapse>
			<h3 slot="header">Author</h3>
			<div class="form-group">
				<label>Name <TextCounter text={embed.author.name} maxlength="256" /></label>
				<input maxlength="256" bind:value={embed.author.name} />
			</div>
			<div class="form-group">
				<label>URL</label>
				<input type="url" bind:value={embed.author.url} />
			</div>
			<div class="form-group">
				<label>Avatar URL</label>
				<input type="url" bind:value={embed.author.icon_url} />
			</div>
		</Collapse>
		<hr />
		<Collapse>
			<h3 slot="header">Body</h3>
			<div class="form-group">
				<label>Color</label>
				<ColorPicker bind:value={embed.color} />
			</div>
			<div class="form-group">
				<label>Title <TextCounter text={embed.title} maxlength="256" /></label>
				<input maxlength="256" bind:value={embed.title} />
			</div>
			<div class="form-group">
				<label>Title URL</label>
				<input type="url" bind:value={embed.url} />
			</div>
			<div class="form-group">
				<label>Description <TextCounter text={embed.description} maxlength="4096" /></label>
				<textarea
					maxlength="4096"
					type="textarea"
					bind:value={embed.description}
					style="height: 150px"
				/>
			</div>
			<div class="form-group">
				<label>Thumbnail URL</label>
				<input type="url" bind:value={embed.thumbnail.url} />
			</div>
		</Collapse>
		<hr />
		<FieldsEditor bind:fields={embed.fields} />
		<hr />
		<Collapse>
			<h3 slot="header">Footer</h3>
			<div class="form-group">
				<label>Text <TextCounter text={embed.footer.text} maxlength="2048" /></label>
				<input maxlength="2048" bind:value={embed.footer.text} />
			</div>
			<div class="form-group">
				<label>Icon URL</label>
				<input type="url" bind:value={embed.footer.icon_url} />
			</div>
			<div class="form-group">
				<label>Timestamp</label>
				<input type="date" name="date" bind:value={embed.timestamp} />
			</div>
		</Collapse>
	</Collapse>
</section>
