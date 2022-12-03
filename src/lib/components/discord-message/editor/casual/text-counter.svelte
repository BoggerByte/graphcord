<script lang="ts">
	export let text: string
	export let maxlength: number
</script>

<span class="ml-1 font-normal italic">
	{text?.length ? text.length : 0} / {maxlength}
</span>
