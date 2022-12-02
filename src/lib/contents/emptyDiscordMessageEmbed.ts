import type { DiscordMessageEmbed } from '$lib/modules/discord'

const emptyDiscordMessageEmbed: DiscordMessageEmbed = {
	title: 'Title',
	author: {
		name: '',
		url: '',
		icon_url: ''
	},
	description: 'Description',
	thumbnail: {
		url: ''
	},
	fields: [],
	footer: {
		text: '',
		icon_url: ''
	}
}

export default emptyDiscordMessageEmbed
