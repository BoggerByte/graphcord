<script lang="ts">
	import type { DiscordMessage } from '$lib/modules/discord'
	import { DiscordMarkdownParser } from '$lib/modules/discord'
	import '$lib/assets/fonts/Whitney/webfont.css'

	export let message: DiscordMessage

	const parser = new DiscordMarkdownParser()

	$: parsed = parser.parse(message)
	$: date = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date())
</script>

<style lang="postcss">
	@import 'style.pcss';
</style>

<div class="discord-message-container pe-2">
	<div class="discord-chat-divider">
		<span class="discord-chat-divider-content"> September 16, 2022 </span>
	</div>
	<div class="discord-message">
		<div class="discord-message-info">
			<img class="discord-message-avatar" src={parsed.author.icon_url} alt="" />
			<div class="discord-message-header">
				<span class="username-container">
					<span class="username">
						{parsed.author.name}
					</span>
					<span class="bot-tag">
						<span class="bot-text">BOT</span>
					</span>
				</span>
				<span class="timestamp-container">
					<time>{parsed.timestamp}</time>
				</span>
			</div>
		</div>
		<div class="discord-message-content discord-markup">
			{@html parsed.content}
		</div>
		<div class="discord-message-accessories discord-markup">
			{#each parsed.embeds as embed}
				<article class="discord-embed" style="border-color: {embed.color}">
					<div class="grid-container">
						<div class="discord-embed-suppress-button">
							<svg role="img" width="16" height="16" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
								/>
							</svg>
						</div>
						{#if embed.author && (embed.author?.icon_url || embed.author?.link || embed.author?.name)}
							<div class="discord-embed-author">
								{#if embed.author.icon_url}
									<img class="discord-embed-author-icon" src={embed.author.icon_url} alt="" />
								{/if}
								{#if embed.author.link}
									<span class="discord-embed-author-name">
										{@html embed.author.name}
									</span>
								{:else}
									<a
										class="discord-embed-author-name discord-embed-author-name-link"
										href={embed.author.link}
									>
										{@html embed.author.name}
									</a>
								{/if}
							</div>
						{/if}
						<div class="discord-embed-title">
							{#if embed.url}
								<a href={embed.url} class="discord-embed-title-link">
									{@html embed.title}
								</a>
							{:else}
								<span>
									{@html embed.title}
								</span>
							{/if}
						</div>
						<div class="discord-embed-description">
							{@html embed.description}
						</div>
						{#if embed.fields.length > 0}
							<div class="discord-embed-fields">
								{#each embed.fields as field}
									<div class="discord-embed-field" class:discord-embed-field-inline={field.inline}>
										<div class="discord-embed-field-name">
											{@html field.name}
										</div>
										<div class="discord-embed-field-value">
											{@html field.value}
										</div>
									</div>
								{/each}
							</div>
						{/if}
						{#if embed.image && embed.image?.url}
							<div class="discord-embed-image-content">
								<img class="image-wrapper" src={embed.image.url} alt="" />
							</div>
						{/if}
						{#if embed.thumbnail && embed.thumbnail?.url}
							<div class="discord-embed-image-content discord-embed-thumbnail">
								<img class="image-wrapper" src={embed.thumbnail.url} alt="" />
							</div>
						{/if}
						{#if embed.footer && (embed.footer.icon_url || embed.footer.text)}
							<div class="discord-embed-footer">
								{#if embed.footer.icon_url}
									<img class="discord-embed-footer-icon" src={embed.footer.icon_url} alt="" />
								{/if}
								{#if embed.footer.text}
									<span class="discord-embed-footer-text">
										{embed.footer.text}
									</span>
								{/if}
								{#if embed.footer.text && embed.timestamp}
									<span class="discord-embed-footer-separator">•</span>
								{/if}
								{#if embed.timestamp}
									<span class="discord-embed-footer-timestamp">
										{embed.timestamp}
									</span>
								{/if}
							</div>
						{/if}
					</div>
				</article>
			{/each}
			<div class="discord-components">
				{#each message.components as actionRow}
					<div class="discord-components-action-row">
						{#each actionRow.components as component}
							<div class="discord-components-action-row-child">
								{#if component.type === 2}
									<button
										class={`discord-components-button discord-components-button-${component.style}`}
									>
										{component.label}
									</button>
								{/if}
								{#if component.type === 3}
									<div class="discord-components-select-menu">
										<span class="placeholder">
											{component.placeholder}
										</span>
										<div class="icon">
											<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"
												/>
											</svg>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
