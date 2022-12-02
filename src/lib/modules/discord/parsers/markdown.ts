import type { DiscordMessage } from '../types/Message'

const rules: { rule: RegExp; template: string }[] = [
	{
		rule: /\*\*\s?([^\n]+)\*\*/g, // **text**
		template: `<strong>$1</strong>` // bold
	},
	{
		rule: /\*\s?([^\n]+)\*/g, // *text*
		template: `<em>$1</em>` // italic
	},
	{
		rule: /__(\S[^_]*)__/g, // __text__
		template: `<u>$1</u>` // underline
	},
	{
		rule: /_(\S[^_]*)_/g, // _text_
		template: `<em>$1</em>` // italic
	},
	{
		rule: /`\s?([^\n]+)`/g, // `text`
		template: `<code>$1</code>` // code
	},
	{
		rule: /\[([^\]]+)\]\(([^)]+)\)/g, // [text](url)
		template: `<a href='$2'>$1</a>` // link
	}
]

class DiscordMarkdownParser {
	_parse_text(text: string): string {
		rules.forEach(({ rule, template }) => {
			text = text.replace(rule, template)
		})
		return text
	}

	parse = (message: DiscordMessage): DiscordMessage => ({
		author: message.author,
		content: this._parse_text(message.content),
		embeds: message.embeds.map((embed) => ({
			color: embed.color,
			title: this._parse_text(embed.title),
			url: embed.url,
			author: {
				name: this._parse_text(embed.author.name),
				url: embed.author.url,
				icon_url: embed.author.icon_url
			},
			description: this._parse_text(embed.description),
			thumbnail: embed.thumbnail,
			fields: embed.fields.map((field) => ({
				name: this._parse_text(field.name),
				value: this._parse_text(field.value),
				inline: field.inline
			})),
			image: embed.image,
			timestamp: embed.timestamp,
			footer: embed.footer
		})),
		components: message.components,
		attachments: message.attachments,
		timestamp: message.timestamp
	})
}

export { DiscordMarkdownParser }
