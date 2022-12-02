<script lang="ts">
	import type { DiscordButton } from '$lib/modules/discord'

	export let component: DiscordButton
</script>

<div class="mt-2">
	<div class="form-group required">
		<label>Style</label>
		<select bind:value={component.style} name="style">
			<option value="primary">Primary</option>
			<option value="secondary">Secondary</option>
			<option value="success">Success</option>
			<option value="danger">Danger</option>
			<option value="link">Link</option>
		</select>
	</div>
	<div class="flex gap-2">
		<div class="form-group">
			<label>Label</label>
			<input bind:value={component.label} type="text" />
		</div>
		<div class="form-group">
			<label>Emoji</label>
			<input type="color" />
		</div>
	</div>
	<div class="form-group">
		<label>URL</label>
		<input bind:value={component.url} type="url" />
	</div>
	<div class="form-group">
		<label>Disabled</label>
		<input bind:checked={component.disabled} type="checkbox" />
	</div>
</div>
