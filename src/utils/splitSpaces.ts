export function splitSpaces(text: string): string[] {
    return text.trim().split(/\\n*\s+|\s+/);
}