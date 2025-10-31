
export function generateId(prefix: string = "item"): string {
    const randomPart = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now().toString(36);
    return `${prefix}_${timestamp}_${randomPart}`;
}
