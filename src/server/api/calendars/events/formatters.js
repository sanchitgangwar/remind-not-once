const summaryRegex = /^(?:\[R\+\])\s+(.*)/g;
const descriptionRegex = /((?:\[-\])|(?:\[\+\]))\s+(.*?)(?=(?:(?:\[+|-\]))|$)/gm;

function getSummary(summary) {
    const regex = summaryRegex;
    const m = regex.exec(summary);

    return m ? m[1] : null;
}

function getTasks(description) {
    const regex = descriptionRegex;

    const tasks = {
        completed: [],
        incomplete: []
    };

    let m;

    // eslint-disable-line no-cond-assign
    while ((m = regex.exec(description)) !== null) {
        if (m[1] === '[+]') {
            tasks.completed.push(m[2]);
        } else if (m[1] === '[-]') {
            tasks.incomplete.push(m[2]);
        }
    }

    return tasks;
}

function formatList(response) {
    const result = [];

    response.items.forEach((event) => {
        const summary = getSummary(event.summary);

        if (summary) {
            const tasks = getTasks(event.description);
            const obj = {
                id: event.id,
                summary,
                completed: tasks.completed,
                incomplete: tasks.incomplete
            };

            result.push(obj);
        }
    });

    return result;
}

export default {
    formatList
};
