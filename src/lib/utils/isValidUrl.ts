export function isValidHttpUrl(url: string): boolean {
        let builtUrl;

        try {
                builtUrl = new URL(url);
        } catch {
                return false;
        }

        return builtUrl.protocol === "http:" || builtUrl.protocol === "https:";
}
