import type { DiscordMessageEmbed } from './MessageEmbed'
import type { DiscordActionRow } from './MessageComponent'

interface DiscordMessageAuthor {
	name: string
	icon_url: string
}

interface DiscordMessageAttachment {
	url: string
}

interface DiscordMessage {
	author: DiscordMessageAuthor
	content?: string
	embeds: DiscordMessageEmbed[]
	components: DiscordActionRow[]
	attachments: DiscordMessageAttachment[]
	timestamp: string
}

export { type DiscordMessage, type DiscordMessageAuthor }
