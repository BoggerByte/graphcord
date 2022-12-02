import type { DiscordMessage } from '$lib/modules/discord'
import { formatTimestamp } from '$lib/modules/discord'

const defaultDiscordMessage: DiscordMessage = {
	author: {
		name: 'Lorem Ipsum bot',
		icon_url: 'https://cdn.discordapp.com/embed/avatars/1.png'
	},
	content: 'I want you to tell about _Lorem Ipsum_ text',
	embeds: [
		{
			color: '#949494',
			title: 'Lorem Ipsum',
			url: 'https://www.lipsum.com/',
			author: {
				name: 'Lorem Ipsum Website',
				url: 'https://www.lipsum.com/',
				icon_url: 'https://www.lipsum.com/favicon.ico'
			},
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			thumbnail: {
				url: 'https://www.lipsum.com/favicon.ico'
			},
			fields: [
				{
					name: '1914 translation by [H. Rackham](https://en.wikipedia.org/wiki/Horace_Rackham)',
					value:
						'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
					inline: false
				},
				{
					name: 'Contacts',
					value: '__help@lipsum.com__',
					inline: true
				},
				{
					name: 'Privacy Policy',
					value: '__lipsum.com/privacy.pdf__',
					inline: true
				}
			],
			footer: {
				text: 'Posted in Lorem Ipsum fans',
				icon_url: 'https://www.lipsum.com/favicon.ico'
			}
		}
	],
	attachments: [],
	components: [],
	timestamp: formatTimestamp(new Date())
}

export default defaultDiscordMessage
