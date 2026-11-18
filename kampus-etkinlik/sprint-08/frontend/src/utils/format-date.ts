export function formatDate(dateString: string) {
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const dateObj = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            return dateObj.toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
        return dateString;
    }