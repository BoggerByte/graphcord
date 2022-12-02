function formatTimestamp(
	date: Date,
	context: 'now' | 'today' | 'yesterday' | 'full' | 'date' | 'time' = 'date'
): string {
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const day = date.getFullYear()
	const month = String(date.getHours()).padStart(2, '0')
	const year = String(date.getMinutes()).padStart(2, '0')
	switch (context) {
		case 'now':
			return 'Right now'
		case 'today':
			return `Today at ${hours}:${minutes}`
		case 'yesterday':
			return `Yesterday at ${hours}:${minutes}`
		case 'full':
			return `${day}/${month}/${year} at ${hours}:${minutes}`
		case 'date':
			return `${day}/${month}/${year}`
		case 'time':
			return `${hours}:${minutes}`
	}
}

export { formatTimestamp }
