<script lang="ts">
	import Router from 'svelte-spa-router'
	import routes from './routes'
	import { Nav } from '$lib/components/nav'
</script>

<Nav />
<main class="container mx-auto sm:px-12 px-6 pt-6">
	<Router {routes} />
</main>
