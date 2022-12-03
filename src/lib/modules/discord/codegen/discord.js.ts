import type { Codegen } from '../types/Codegen'
import type { DiscordMessage } from '../types/Message'

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

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

			if (embed.author && embed.author?.name && embed.author?.url && embed.author?.icon_url) {
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

			if (embed.thumbnail && embed.thumbnail?.url) {
				jsEmbedThumbnail += `\t.setThumbnail("${embed.thumbnail.url}")\n`
			}

			if (embed.fields.length > 0) {
				jsEmbedFields += `\t.setFields(\n`

				for (const field of embed.fields) {
					const jsEmbedFieldPrefix = '\t\t{\n'
					let jsEmbedFieldName = '',
						jsEmbedFieldValue = '',
						jsEmbedFieldInline = ''
					const jsEmbedFieldPostfix = '\t\t},\n'

					if (!field || (!field?.name && !field?.value)) {
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
				jsEmbedFields += '\t)\n'
			}

			if (embed.footer && embed.footer?.text && embed.footer?.icon_url) {
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

		let jsActionRows = ''
		for (const actionRow of message.components) {
			const jsActionRowPrefix = `const row${'_'} = new ActionRowBuilder()\n`
			let jsActionRowComponents = ''
			const jsActionRowPostfix = ')\n'

			jsActionRowComponents += '\t.addComponents(\n'
			for (const component of actionRow.components) {
				if (component.type === 2) {
					// button
					const jsButtonPrefix = '\t\tnew ButtonBuilder()\n'
					let jsButtonCustomId = ''
					let jsButtonStyle = ''
					let jsButtonLabel = ''
					let jsButtonEmoji = ''
					let jsButtonUrl = ''
					let jsButtonDisabled = ''
					const jsButtonPostfix = ''

					if (component.custom_id) {
						jsButtonCustomId += `\t\t\t.setCustomId("${component.custom_id}")\n`
					}

					if (component.style) {
						jsButtonStyle += `\t\t\t.setStyle(ButtonStyle.${capitalize(component.style)})\n`
					}

					if (component.label) {
						jsButtonLabel += `\t\t\t.setLabel("${component.label}")\n`
					}

					if (component.emoji) {
						jsButtonEmoji += `\t\t\t.setEmoji("${component.emoji.id}")\n`
					}

					if (component.url) {
						jsButtonUrl += `\t\t\t.setURL("${component.url}")\n`
					}

					if (component.disabled) {
						jsButtonDisabled += `\t\t\t.setDisabled(${component.disabled ? 'true' : 'false'})\n`
					}

					jsActionRowComponents +=
						jsButtonPrefix +
						jsButtonCustomId +
						jsButtonStyle +
						jsButtonLabel +
						jsButtonEmoji +
						jsButtonUrl +
						jsButtonDisabled +
						jsButtonPostfix
				} else if ([3, 5, 6, 7, 8].includes(component.type)) {
					// select menu
					const jsSelectMenuPrefix = '\t\tnew SelectMenuBuilder()\n'
					let jsSelectMenuCustomId = ''
					let jsSelectMenuOptions = ''
					let jsSelectMenuPlaceholder = ''
					let jsSelectMenuMinValues = ''
					let jsSelectMenuMaxValues = ''
					let jsSelectMenuDisabled = ''
					const jsSelectMenuPostfix = ''

					if (component.custom_id) {
						jsSelectMenuCustomId += `\t\t\t.setCustomId("${component.custom_id}")\n`
					}

					if (component.options && component.options.length > 0) {
						const jsOptionsPrefix = '\t\t\t.addOptions([\n'
						let jsOptions = ''
						const jsOptionsPostfix = '\t\t\t])\n'

						for (const option of component.options) {
							const jsOptionPrefix = '\t\t\t\t{\n'
							let jsOption = ''
							const jsOptionPostfix = '\t\t\t\t},\n'

							if (option.label) {
								jsOption += `\t\t\t\t\tlabel: "${option.label}",\n`
							}
							if (option.value) {
								jsOption += `\t\t\t\t\tvalue: "${option.value}",\n`
							}
							if (option.description) {
								jsOption += `\t\t\t\t\tdescription: "${option.description}",\n`
							}
							if (option.default) {
								jsOption += `\t\t\t\t\tdefault: ${option.default ? 'true' : 'false'},\n`
							}

							jsOptions +=
								jsOptionPrefix +
								jsOption +
								jsOptionPostfix
						}

						jsSelectMenuOptions +=
							jsOptionsPrefix +
							jsOptions +
							jsOptionsPostfix
					}

					if (component.placeholder) {
						jsSelectMenuPlaceholder += `\t\t\t.setPlaceholder("${component.placeholder}")\n`
					}

					if (component.min_values) {
						jsSelectMenuMinValues += `\t\t\t.setMinValues(${component.min_values})\n`
					}

					if (component.max_values) {
						jsSelectMenuMaxValues += `\t\t\t.setMaxValues(${component.max_values})\n`
					}

					if (component.disabled) {
						jsSelectMenuDisabled += `\t\t\t.setDisabled(${component.disabled ? 'true' : 'false'})\n`
					}

					jsActionRowComponents +=
						jsSelectMenuPrefix +
						jsSelectMenuCustomId +
						jsSelectMenuOptions +
						jsSelectMenuPlaceholder +
						jsSelectMenuMinValues +
						jsSelectMenuMaxValues +
						jsSelectMenuDisabled +
						jsSelectMenuPostfix
				}
			}

			jsActionRows +=
				jsActionRowPrefix +
				jsActionRowComponents +
				jsActionRowPostfix
		}

		return (
			(message.content 			   ? `${jsContent}\n` : '') +
			(message.embeds.length > 0 	   ? `${jsEmbeds}\n` : '') +
			(message.components.length > 0 ? `${jsActionRows}\n` : '')
		)
	}
}
