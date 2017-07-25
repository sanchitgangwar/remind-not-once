function formatDetails(details) {
    let accountEmail;

    if (!details.emails) {
        return details;
    }

    for (let i = details.emails.length - 1; i >= 0; --i) {
        if (details.emails[i].type === 'account') {
            accountEmail = details.emails[i].value;
            break;
        }
    }

    return {
        ...details,
        accountEmail
    };
}

export default {
    formatDetails
};
