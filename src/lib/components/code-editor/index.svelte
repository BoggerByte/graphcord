<script lang="ts">
	import Prism from 'prismjs'
	import 'prismjs/components/prism-javascript'
	import 'prismjs/components/prism-json'
	import 'prismjs/components/prism-python'
	import 'prismjs/themes/prism-tomorrow.min.css'
	// import { Icon } from '$lib/components/icon'
	// import copyToClipboard from '$lib/utils/copyToClipboard'

	export let code: string
	export let language: 'json' | 'js' | 'python'
	export let readonly = false

	// function copyCodeToClipboard() {
	// 	copyToClipboard(code)
	// }

	// TODO: Implement copying code to clipboard

	function parse(code: string): string {
		let highlighted = Prism.highlight(code, Prism.languages[language], language)
		return highlighted.replace(/(\t)/g, `<span class="parsed-tab">&emsp;</span>`)
	}
</script>

<style lang="postcss">
	:global(.parsed-tab) {
		@apply relative;
	}

	:global(.parsed-tab)::before {
		@apply absolute top-1/2 left-0 -translate-y-1/2
				w-[1px] h-[1.4rem]
				bg-[#3b3e44];
		content: '';
	}
</style>

<div
	class="flex flex-col w-full max-w-[calc(100vw-7rem)] h-full overflow-hidden
            rounded-md border-[1px] border-[#18191b]
            bg-[#2f3136]"
>
	{#if readonly}
		<div
			class="px-[8px] py-[2px]
					flex items-center
					leading-snug text-[14px] text-[#644002]
					bg-[#f4a825]"
		>
			Warning! This editor is readonly!
		</div>
	{/if}
	<div
		class="px-[8px] py-[3px]
	            flex items-center
                bg-[#18191b]"
	>
		<div class="text-[14px] text-[#e5e5e6] leading-snug">
			<slot name="title">Code</slot>
		</div>
	</div>
	<div
		class="flex-grow overflow-x-hidden overflow-y-scroll grid grid-cols-[80px_1fr] gap-[5px]
				leading-snug text-[14px] font-mono"
	>
		<div
			class="px-[8px] py-[5px]
				border-r-[1px] border-[#18191b]
				bg-[#202225]"
		/>
		<div
			class="pl-[7px] pr-[35px] py-[8px]
				bg-[#2f3136]
				cursor-text"
		>
			{#each parse(code).split('\n') as line, idx}
				<div class="relative">
					<div
						class="absolute -left-[70px]
							text-[#3b3f44]
							select-none cursor-default"
					>
						{idx + 1}
					</div>
					<pre
						class="px-0 py-[1px] m-0 overflow-visible
							border-none
							text-[#b9bbbe]
							whitespace-pre-wrap break-words">{@html line}&ZeroWidthSpace;</pre>
				</div>
			{/each}
		</div>
	</div>
</div>
