<script lang="ts">
	export let placeholder = '#000000'
	export let value = placeholder

	function handleInput(e) {
		const hexRegex = new RegExp(/^#[0-9a-fA-F]{6}$/)
		if (hexRegex.test(e.target.value)) {
			value = e.target.value
		}
	}
</script>

<div class="flex gap-1 items-stretch">
	<input {value} on:input={handleInput} type="text" class="font-mono text-gray-600" />
	<input bind:value type="color" />
</div>
