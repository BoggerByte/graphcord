interface DiscordEmoji {
	id: string
	name: string
}

interface DiscordButton {
	type: 2
	style: 'primary' | 'secondary' | 'success' | 'danger' | 'link'
	label?: string
	emoji?: DiscordEmoji
	custom_id?: string
	url?: string
	disabled?: boolean
}

interface DiscordSelectMenu {
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

interface DiscordActionRow {
	type: 1
	components: DiscordMessageComponent[]
}

type DiscordMessageComponent = DiscordButton | DiscordSelectMenu

export {
	type DiscordButton,
	type DiscordSelectMenu,
	type DiscordActionRow,
	type DiscordMessageComponent
}
