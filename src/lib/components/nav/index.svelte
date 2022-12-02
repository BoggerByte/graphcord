<script lang="ts">
	import DesktopMenu from './desktop'
	import MobileMenu from './mobile'
	import useMediaQuery from '$lib/utils/useMediaQuery'

	$: mobileMode = useMediaQuery('(max-width: 767px)')
</script>

<nav
	class="sticky top-0 z-50 py-1.5 h-14
		   shadow-md
		   bg-gray-800 backdrop-blur-2xl"
>
	{#if $mobileMode}
		<MobileMenu />
	{:else}
		<DesktopMenu />
	{/if}
</nav>
