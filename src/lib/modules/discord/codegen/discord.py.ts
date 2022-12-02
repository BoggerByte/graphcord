import type { Codegen } from '../types/Codegen'
import type { DiscordMessage } from '../types/Message'

export default class CodegenPython implements Codegen {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	fromJsonMessage(config: DiscordMessage): string {
		return ''
	}
}
