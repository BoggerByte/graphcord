<script lang="ts">
	import TextCounter from './text-counter.svelte'
	import EmbedsEditor from './embeds-editor/index.svelte'
	import ComponentsEditor from './components-editor/index.svelte'
	import AuthorEditor from './author-editor/index.svelte'
	import type { DiscordMessage } from '$lib/modules/discord'
	import './style.pcss'

	export let message: DiscordMessage
</script>

<div class="pr-2 flex flex-col gap-[6px]">
	<AuthorEditor bind:author={message.author} />
	<hr />
	<div class="my-[4px] px-2 form-group">
		<label>Content <TextCounter text={message.content} maxlength="2000" /></label>
		<textarea maxlength="2000" bind:value={message.content} style="height: 200px" />
	</div>
	<hr />
	<EmbedsEditor bind:embeds={message.embeds} />
	<hr />
	<ComponentsEditor bind:actionRows={message.components} />
	<hr />
	<div
		class="mt-2 px-2 flex justify-end
				text-xs text-gray-500 font-normal italic"
	>
		<TextCounter text={JSON.stringify(message)} maxlength="6000" />
	</div>
</div>
