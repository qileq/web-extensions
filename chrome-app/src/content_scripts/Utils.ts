
export function getWord(text: string): string {
	const re = /^([a-zA-Z]?[a-z]+|[A-Z]+)$/
	if (text.match(re)) {
		return text.toLowerCase()
	}
	return ""
}
