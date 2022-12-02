<script lang="ts">
	import CodeEditor from '$lib/components/code-editor'
	import type { DiscordMessage } from '$lib/modules/discord'
	import { CodegenJS } from '$lib/modules/discord/codegen'

	const codegen = new CodegenJS()

	export let message: DiscordMessage

	$: code = codegen.fromJsonMessage(message)
</script>

<CodeEditor bind:code language="js" readonly>
	<svelte:fragment slot="title">Discord message (DiscordJS)</svelte:fragment>
</CodeEditor>
