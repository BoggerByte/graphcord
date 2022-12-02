import type { DiscordMessageComponent } from '$lib/modules/discord'

const defaultDiscordMessageComponents: { [name: string]: DiscordMessageComponent } = {
	button: {
		type: 2,
		style: 'success',
		label: 'Button'
	},
	'select-menu': {
		type: 3,
		custom_id: 'selectMenu',
		placeholder: 'Select something',
		options: [
			{
				label: 'Option 1',
				value: 'option 1 value'
			},
			{
				label: 'Option 2',
				value: 'Option 2 value'
			}
		]
	}
}

export default defaultDiscordMessageComponents
