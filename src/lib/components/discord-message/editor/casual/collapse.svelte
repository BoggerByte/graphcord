<script lang="ts">
	import { Icon } from '$lib/components/icon'
	import { slide } from 'svelte/transition'

	export let isOpen = false

	const toggle = () => (isOpen = !isOpen)
</script>

<style lang="postcss">
	button:focus {
		@apply text-white;
	}
</style>

<section>
	<header
		class="py-1 px-1.5
	           flex items-center"
	>
		<div>
			<button class="flex items-center gap-2" on:click={toggle}>
				<Icon
					name="chevron-right"
					class={`transition-all duration-200 ease-out ${isOpen ? 'rotate-90' : ''}`}
				/>
				<slot name="header" />
			</button>
		</div>
		<div class="flex gap-2 ml-auto">
			<slot ref="buttons" name="buttons" />
		</div>
	</header>
	{#if isOpen}
		<div transition:slide|local={{ duration: 350 }} class="px-2 pb-2 flex flex-col gap-1">
			<slot />
		</div>
	{/if}
</section>
