export default function (content: string) {
	if (navigator) {
		navigator.clipboard
			.writeText(content)
			.then((r) => r)
			.catch((error) => console.error(`Clipboard copy: ${error as string}"`))
	}
}
