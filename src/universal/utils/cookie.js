function readCookie(name) {
    const parts = document.cookie.split('; ');

    for (let i = parts.length - 1; i >= 0; i--) {
        const cookieParts = parts[i].split('=');
        if (cookieParts[0] === name) {
            return cookieParts[1];
        }
    }

    return null;
}

export default readCookie;
