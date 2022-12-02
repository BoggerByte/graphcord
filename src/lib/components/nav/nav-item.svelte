<script lang="ts">
	import active from 'svelte-spa-router/active'

	export let href = ''
	export let label = ''
	export let highlight = false
</script>

<style lang="postcss">
	.nav-item {
		@apply relative
			   text-gray-400 hover:text-white
			   cursor-pointer
			   transition-all duration-100 ease-out;
		text-shadow: 0 0 0 gray;

		&:hover {
			text-shadow: 0 0 10px gray;
		}
	}

	:global(.nav-item > a.active) {
		@apply text-white
		transition-all duration-100 ease-out;
		text-shadow: 0 0 10px gray;
	}
</style>

<li class="nav-item">
	{#if href.startsWith('/#')}
		<a {href} use:active={{ path: href, className: 'active' }}>
			{#if $$slots.default}
				<slot />
			{:else}
				{label}
			{/if}
		</a>
	{:else}
		<a {href} target="_blank" rel="noreferrer">
			{#if $$slots.default}
				<slot />
			{:else}
				{label}
			{/if}
		</a>
	{/if}
	{#if highlight}
		<svg height="10" width="10" class="absolute top-0 -right-3">
			<circle cx="5" cy="5" r="3.5" fill="#ED4245FF" />
		</svg>
	{/if}
</li>
