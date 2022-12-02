interface DiscordEmbedAuthor {
	name: string
	icon_url?: string
	url?: string
}

interface DiscordEmbedThumbnail {
	url: string
}

interface DiscordEmbedImage {
	url: string
}

interface DiscordEmbedField {
	name: string
	value: string
	inline?: boolean
}

interface DiscordEmbedFooter {
	text: string
	icon_url?: string
}

interface DiscordMessageEmbed {
	color?: string
	title: string
	url?: string
	author?: DiscordEmbedAuthor
	description: string
	thumbnail?: DiscordEmbedThumbnail
	fields: DiscordEmbedField[]
	image?: DiscordEmbedImage
	timestamp?: string
	footer?: DiscordEmbedFooter
}

export {
	type DiscordMessageEmbed,
	type DiscordEmbedAuthor,
	type DiscordEmbedThumbnail,
	type DiscordEmbedImage,
	type DiscordEmbedField,
	type DiscordEmbedFooter
}
