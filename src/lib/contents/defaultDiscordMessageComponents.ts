import type { DiscordMessageComponent } from '$lib/modules/discord'

const defaultDiscordMessageComponents: { [name: string]: DiscordMessageComponent } = {
	button: {
		type: 2,
		custom_id: 'button',
		style: 'secondary',
		label: 'Button'
	},
	'string-select': {
		type: 3,
		custom_id: 'string_select',
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
	},
	'user-select': {
		type: 5,
		custom_id: 'user_select',
		placeholder: 'Select something'
	},
	'role-select': {
		type: 6,
		custom_id: 'role_select',
		placeholder: 'Select something'
	},
	'mentionable-select': {
		type: 7,
		custom_id: 'mentionable_select',
		placeholder: 'Select something'
	},
	'channel-select': {
		type: 8,
		custom_id: 'channel_select',
		placeholder: 'Select something'
	}
}

export default defaultDiscordMessageComponents
