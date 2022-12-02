<script lang="ts">
	import githubLogoLight64px from '$lib/assets/images/github-logo-light-64px.png'
	import Logo from '../logo.svelte'
	import NavItem from '../nav-item.svelte'
	import Toggler from './toggler.svelte'
	import menuState from './menuState'
	import { slide } from 'svelte/transition'
</script>

<style lang="postcss">
	hr {
		border-color: hsl(223, 7%, 25%);
		margin: 0.05rem 0;
	}
</style>

<div
	class="mx-6
           flex flex-row items-center"
>
	<div>
		<Logo />
	</div>
	<div class="ml-auto">
		<Toggler />
	</div>
</div>
{#if $menuState}
	<div
		class="px-8 pt-6 pb-4
			   flex flex-col gap-2
			   shadow-md
			   bg-gray-800"
		transition:slide|local={{ duration: 350 }}
	>
		<ul class="flex flex-col gap-2">
			<li><hr /></li>
			<NavItem href="https://github.com">
				<div class="flex items-center gap-1.5">
					<img src={githubLogoLight64px} alt="github-logo-light-64px" width="20" height="20" />
					GitHub
				</div>
			</NavItem>
			<li><hr /></li>
			<NavItem href="/#/docs" label="Docs" />
			<li><hr /></li>
		</ul>
	</div>
{/if}
