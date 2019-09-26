export function formatDate(date) {
    const dateFormatter = new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    try {
        return date ? dateFormatter.format(new Date(date)) : '';
    } catch (error) {
        return date;
    }
}