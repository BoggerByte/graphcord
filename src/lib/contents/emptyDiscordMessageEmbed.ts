import type { DiscordMessageEmbed } from '$lib/modules/discord'

const emptyDiscordMessageEmbed: DiscordMessageEmbed = {
	color: '#949494',
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
