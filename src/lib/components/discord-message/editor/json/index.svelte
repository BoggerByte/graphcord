<script lang="ts">
	import CodeEditor from '$lib/components/code-editor'
	import type { DiscordMessage } from '$lib/modules/discord'

	export let message: DiscordMessage

	$: code = JSON.stringify(message, null, '\t')
</script>

<div style="height: 500px">
	<CodeEditor bind:code language="json">
		<svelte:fragment slot="title">Discord message (JSON)</svelte:fragment>
	</CodeEditor>
</div>
