<script lang="ts">
	import githubLogoLight64px from '$lib/assets/images/github-logo-light-64px.png'
	import NavItem from '../nav-item.svelte'
	import Logo from '../logo.svelte'
</script>

<div
	class="container mx-auto px-6
           flex flex-row items-center"
>
	<div class="mr-6">
		<Logo />
	</div>
	<ul class="flex flex-row gap-6">
		<NavItem href="https://github.com">
			<div class="flex items-center gap-1.5">
				<img src={githubLogoLight64px} alt="github-logo-light-64px" width="20" height="20" />
				GitHub
			</div>
		</NavItem>
		<NavItem href="/#/docs" label="Docs" highlight />
	</ul>
</div>
