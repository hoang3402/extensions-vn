export function decodeHtml(encodedString: string): string {
    const entityRegex = /&(#[0-9]+|[a-z]+);/gi
    const entities: { [key: string]: string } = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&apos;': "'",
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x3D;': '=',
        '&#x22;': '"',
        '&#x3C;': '<',
        '&#x3E;': '>'
    }

    return encodedString.replace(entityRegex, (match, entity) => {
        if (entity[0] === '#') {
            const code = entity.slice(1)
            if (code[0] === 'x') {
                return String.fromCharCode(parseInt(code.slice(1), 16))
            } else {
                return String.fromCharCode(parseInt(code))
            }
        } else {
            // eslint-disable-next-line semi
            return entities[match] || match;
        }
    })
}
