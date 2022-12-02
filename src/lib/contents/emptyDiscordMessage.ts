import type { DiscordMessage } from '$lib/modules/discord'
import { formatTimestamp } from '$lib/modules/discord'

const emptyDiscordMessage: DiscordMessage = {
	author: {
		name: 'bot',
		icon_url: 'https://cdn.discordapp.com/embed/avatars/1.png'
	},
	content: 'content',
	embeds: [],
	attachments: [],
	components: [],
	timestamp: formatTimestamp(new Date())
}

export default emptyDiscordMessage
