<script lang="ts">
	import { CodeEditor } from '$lib/components/code-editor'
	import type { DiscordMessage } from '$lib/modules/discord'
	// import { CodegenJS } from '$lib/modules/discord/codegen'

	// const codegen = new CodegenJS()

	export let message: DiscordMessage

	// TODO: Implement DiscordPy code generator

	$: code = `# ${message}`
</script>

<div style="height: 500px">
	<CodeEditor bind:code language="python" readonly>
		<svelte:fragment slot="title">Discord message (DiscordPy)</svelte:fragment>
	</CodeEditor>
</div>
