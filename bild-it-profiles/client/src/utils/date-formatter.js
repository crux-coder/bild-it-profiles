export function formatDateFull(date) {
    const dateFormatter = new Intl.DateTimeFormat('bs-BA', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
    });
    try {
        return date ? dateFormatter.format(new Date(date)) : '';
    } catch (error) {
        return date;
    }
}

export function formatDate(date) {
    const dateFormatter = new Intl.DateTimeFormat('bs-BA', {
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