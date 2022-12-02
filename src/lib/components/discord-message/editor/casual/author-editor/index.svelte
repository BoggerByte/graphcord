<script lang="ts">
	import Collapse from '../collapse.svelte'
	import TextCounter from '../text-counter.svelte'
	import type { DiscordMessageAuthor } from '$lib/modules/discord/types/Message'

	export let author: DiscordMessageAuthor
</script>

<Collapse isOpen={true}>
	<h3 slot="header">Profile</h3>
	<div class="form-group">
		<label>Username <TextCounter text={author.name} maxlength="40" /></label>
		<input maxlength="40" bind:value={author.name} />
	</div>
	<div class="form-group">
		<label>Avatar URL</label>
		<input bind:value={author.icon_url} />
	</div>
</Collapse>
