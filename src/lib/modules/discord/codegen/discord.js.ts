import type { Codegen } from '../types/Codegen'
import type { DiscordMessage } from '../types/Message'

export default class CodegenJS implements Codegen {
	fromJsonMessage(message: DiscordMessage): string {
		const jsContent = `const content = "${message.content}"\n`

		let jsEmbeds = ''
		for (const embed of message.embeds) {
			const jsEmbedPrefix = `const embed${'_'} = new EmbedBuilder()\n`
			let jsEmbedColor = '',
				jsEmbedAuthor = '',
				jsEmbedTitle = '',
				jsEmbedUrl = '',
				jsEmbedDescription = '',
				jsEmbedThumbnail = '',
				jsEmbedFields = '',
				jsEmbedFooter = ''
			const jsEmbedPostfix = ''

			if (!embed || Object.keys(embed).length === 0) {
				continue
			}

			if (embed.color) {
				jsEmbedColor = `\t.setColor(0x${embed.color.substring(1).toUpperCase()})\n`
			}

			if (embed.author && Object.keys(embed.author).length > 0) {
				const jsEmbedAuthorPrefix = '\t.setAuthor({\n'
				let jsEmbedAuthorName = '',
					jsEmbedAuthorUrl = '',
					jsEmbedAuthorIconUrl = ''
				const jsEmbedAuthorPostfix = '\t})\n'

				if (embed.author.name) {
					jsEmbedAuthorName = `\t\tname: "${embed.author.name}"\n`
				}
				if (embed.author.url) {
					jsEmbedAuthorUrl = `\t\turl: "${embed.author.url}"\n`
				}
				if (embed.author.icon_url) {
					jsEmbedAuthorIconUrl = `\t\ticon_url: "${embed.author.icon_url}"\n`
				}

				jsEmbedAuthor =
					jsEmbedAuthorPrefix +
					jsEmbedAuthorName +
					jsEmbedAuthorUrl +
					jsEmbedAuthorIconUrl +
					jsEmbedAuthorPostfix
			}

			if (embed.title) {
				jsEmbedTitle = `\t.setTitle("${embed.title}")\n`
			}

			if (embed.url) {
				jsEmbedUrl = `\t.setURL("${embed.url}")\n`
			}

			if (embed.description) {
				jsEmbedDescription = `\t.setDescription("${embed.description}")\n`
			}

			if (embed.thumbnail && Object.keys(embed.thumbnail).length > 0) {
				jsEmbedThumbnail += `\t.setThumbnail("${embed.thumbnail.url}")\n`
			}

			if (embed.fields.length > 0) {
				jsEmbedFields += `\t.setFields(\n`

				for (const field of embed.fields) {
					const jsEmbedFieldPrefix = '\t\t{\n'
					let jsEmbedFieldName = '',
						jsEmbedFieldValue = '',
						jsEmbedFieldInline = ''
					const jsEmbedFieldPostfix = '\\t\\t},\n'

					if (!field || Object.keys(field).length === 0) {
						continue
					}

					if (field.name) {
						jsEmbedFieldName += `\t\t\tname: "${field.name}"\n`
					}
					if (field.value) {
						jsEmbedFieldValue += `\t\t\tvalue: "${field.value}"\n`
					}
					if (field.inline) {
						jsEmbedFieldInline += `\t\t\tinline: ${field.inline ? 'true' : 'false'}\n`
					}

					jsEmbedFields +=
						jsEmbedFieldPrefix +
						jsEmbedFieldName +
						jsEmbedFieldValue +
						jsEmbedFieldInline +
						jsEmbedFieldPostfix
				}

				jsEmbedFields += '\n\t'
			}

			if (embed.footer && Object.keys(embed.footer).length > 0) {
				const jsEmbedFooterPrefix = `\t.setFooter({\n`
				let jsEmbedFooterText = '',
					jsEmbedFooterIconUrl = ''
				const jsEmbedFooterPostfix = '\t})\n'

				if (embed.footer.text) {
					jsEmbedFooterText = `\t\ttext: "${embed.footer.text}"\n`
				}
				if (embed.footer.icon_url) {
					jsEmbedFooterIconUrl = `\t\ticon_url: "${embed.footer.icon_url}"\n`
				}

				jsEmbedFooter =
					jsEmbedFooterPrefix + jsEmbedFooterText + jsEmbedFooterIconUrl + jsEmbedFooterPostfix
			}

			jsEmbeds +=
				jsEmbedPrefix +
				jsEmbedColor +
				jsEmbedAuthor +
				jsEmbedTitle +
				jsEmbedUrl +
				jsEmbedDescription +
				jsEmbedThumbnail +
				jsEmbedFields +
				jsEmbedAuthor +
				jsEmbedFooter +
				jsEmbedPostfix
		}

		return (
			'' +
			(message.content ? `${jsContent}\n` : '') +
			(message.embeds.length ? `${jsEmbeds}\n` : '') +
			'await ctx.send({\n' +
			(message.content ? `\tcontent: content\n` : '') +
			(message.embeds.length
				? `\tembeds: [${message.embeds.map((_, idx) => `embed${idx + 1}`).join(', ')}]\n`
				: '') +
			'})'
		)
	}
}
