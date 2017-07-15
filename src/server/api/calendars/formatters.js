function calendarsList(response) {
    const result = [];

    response.items.forEach((calendar) => {
        if (calendar.accessRole === 'owner') {
            const obj = {
                id: calendar.id,
                summary: calendar.summary,
                backgroundColor: calendar.backgroundColor,
                foregroundColor: calendar.foregroundColor,
            };

            if (calendar.primary) {
                result.unshift(obj);
            } else {
                result.push(obj);
            }
        }
    });

    return result;
}

export default {
    calendarsList
};
