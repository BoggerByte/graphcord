import type { DiscordMessage } from './Message'

interface Codegen {
	fromJsonMessage(config: DiscordMessage): string
}

export { type Codegen }
