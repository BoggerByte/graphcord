<script lang="ts">
	import { Tabs, Tab, TabLink } from '$lib/components/tabs'
	import { Icon } from '$lib/components/icon/index.js'
	import {
		DiscordMessageCasualEditor,
		DiscordMessageJSONEditor
	} from '$lib/components/discord-message/editor'
	import {
		DiscordMessageCasualPreview,
		DiscordMessageDiscordJSPreview,
		DiscordMessageDiscordPyPreview
	} from '$lib/components/discord-message/preview'
	import defaultDiscordMessage from '$lib/contents/defaultDiscordMessage'
	import emptyDiscordMessage from '$lib/contents/emptyDiscordMessage'
	import useMediaQuery from '$lib/utils/useMediaQuery'

	let message = structuredClone(defaultDiscordMessage)

	function reset() {
		message = structuredClone(defaultDiscordMessage)
	}
	function clear() {
		message = structuredClone(emptyDiscordMessage)
	}

	$: mobileMode = useMediaQuery('(max-width: 1025px)')
</script>

{#if $mobileMode}
	<div class="flex overflow-x-auto gap-8 snap-x snap-mandatory">
		<div class="shrink-0 snap-center w-full">
			<Tabs>
				<nav slot="headers" class="flex gap-2 justify-center">
					<div>
						<TabLink tabId="m-editor-casual" header="Casual" active />
						<TabLink tabId="m-editor-json" header="JSON" />
					</div>
					<div class="flex gap-2">
						<button title="Clear" class="p-2 bg-danger rounded" on:click={clear}>
							<Icon name="cross" />
						</button>
						<button title="Reset" class="p-2 bg-gray-500 rounded" on:click={reset}>
							<Icon name="arrow-path" />
						</button>
					</div>
				</nav>
				<Tab tabId="m-editor-casual">
					<DiscordMessageCasualEditor bind:message />
				</Tab>
				<Tab tabId="m-editor-json">
					<DiscordMessageJSONEditor bind:message />
				</Tab>
			</Tabs>
		</div>
		<div class="shrink-0 snap-center w-full">
			<Tabs>
				<nav slot="headers" class="flex gap-2 justify-center">
					<div>
						<TabLink tabId="m-preview-casual" header="Casual" active />
						<TabLink tabId="m-preview-discord-js" header="Discord JS" />
						<TabLink tabId="m-preview-discord-py" header="Discord py" />
					</div>
				</nav>
				<Tab tabId="m-preview-casual">
					<DiscordMessageCasualPreview {message} />
				</Tab>
				<Tab tabId="m-preview-discord-js">
					<DiscordMessageDiscordJSPreview {message} />
				</Tab>
				<Tab tabId="m-preview-discord-py">
					<DiscordMessageDiscordPyPreview {message} />
				</Tab>
			</Tabs>
		</div>
	</div>
{:else}
	<div class="grid grid-cols-2 gap-4">
		<Tabs>
			<nav slot="headers" class="flex gap-2">
				<div>
					<TabLink tabId="editor-casual" header="Casual" active />
					<TabLink tabId="editor-json" header="JSON" />
				</div>
				<div class="ml-auto mr-4 flex gap-2">
					<button title="Clear" class="p-2 bg-danger rounded" on:click={clear}>
						<Icon name="cross" />
					</button>
					<button title="Reset" class="p-2 bg-gray-500 rounded" on:click={reset}>
						<Icon name="arrow-path" />
					</button>
				</div>
			</nav>
			<Tab tabId="editor-casual">
				<DiscordMessageCasualEditor bind:message />
			</Tab>
			<Tab tabId="editor-json">
				<DiscordMessageJSONEditor bind:message />
			</Tab>
		</Tabs>
		<Tabs>
			<nav slot="headers" class="flex gap-2">
				<div>
					<TabLink tabId="preview-casual" header="Casual" active />
					<TabLink tabId="preview-discord-js" header="Discord JS" />
					<TabLink tabId="preview-discord-py" header="Discord py" />
				</div>
			</nav>
			<Tab tabId="preview-casual">
				<DiscordMessageCasualPreview {message} />
			</Tab>
			<Tab tabId="preview-discord-js">
				<DiscordMessageDiscordJSPreview {message} />
			</Tab>
			<Tab tabId="preview-discord-py">
				<DiscordMessageDiscordPyPreview {message} />
			</Tab>
		</Tabs>
	</div>
{/if}
