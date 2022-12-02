interface DiscordEmoji {
	id: string
	name: string
}

interface DiscordButton {
	type: 2
	custom_id: string
	style: 'primary' | 'secondary' | 'success' | 'danger' | 'link'
	label?: string
	emoji?: DiscordEmoji
	url?: string
	disabled?: boolean
}

interface DiscordStringSelect {
	type: 3
	custom_id: string
	options: {
		label: string
		value: string
		description?: string
		emoji?: DiscordEmoji
		default?: boolean
	}[]
	placeholder?: string
	min_values?: number
	max_values?: number
	disabled?: boolean
}

interface DiscordUserSelect {
	type: 5
	custom_id: string
	placeholder?: string
	min_values?: number
	max_values?: number
	disabled?: boolean
}

interface DiscordRoleSelect {
	type: 6
	custom_id: string
	placeholder?: string
	min_values?: number
	max_values?: number
	disabled?: boolean
}

interface DiscordMentionableSelect {
	type: 7
	custom_id: string
	placeholder?: string
	min_values?: number
	max_values?: number
	disabled?: boolean
}

interface DiscordChannelSelect {
	type: 8
	custom_id: string
	placeholder?: string
	min_values?: number
	max_values?: number
	disabled?: boolean
}

interface DiscordActionRow {
	type: 1
	components: DiscordMessageComponent[]
}

type DiscordMessageComponent =
	| DiscordButton
	| DiscordStringSelect
	| DiscordUserSelect
	| DiscordRoleSelect
	| DiscordMentionableSelect
	| DiscordChannelSelect

export {
	type DiscordButton,
	type DiscordStringSelect,
	type DiscordActionRow,
	type DiscordMessageComponent
}
