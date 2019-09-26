const ACCESS_TOKEN = 'accessToken';

export const config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
}