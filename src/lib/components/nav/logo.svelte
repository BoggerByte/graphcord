<script lang="ts">
	import active from 'svelte-spa-router/active'
	import { link } from 'svelte-spa-router'
</script>

<style lang="postcss">
	.wrapper {
		@apply flex flex-col justify-center mx-2 my-1
                cursor-pointer;

		&:hover .logo {
			@apply text-indigo-300;
			text-shadow: 0 1px 20px theme('colors.indigo.700');
		}

		&:hover .sub-domain {
			@apply text-gray-400;
			text-shadow: 0 1px 20px theme('colors.gray.700');
		}
	}

	.logo {
		@apply text-indigo-500 text-2xl font-extrabold leading-[1];

		text-shadow: 0 0 10px theme('colors.indigo.700');
		transition: all 300ms ease-in-out;
	}

	.sub-domain {
		@apply text-gray-500 text-[1rem] font-normal leading-[1];

		text-shadow: 0 0 10px theme('colors.gray.700');
		transition: all 300ms ease-in-out 50ms;
	}

	:global(.wrapper.active .sub-domain) {
		@apply text-gray-400;
		text-shadow: 0 1px 20px theme('colors.gray.700');
	}
</style>

<a href="/" use:link use:active={{ path: '/', className: 'active' }} class="wrapper">
	<span class="logo">Graphcord</span>
	<span class="sub-domain">Message Generator</span>
</a>
