import moment from 'moment';

const summaryRegex = /^(?:\[R\+\])\s+(.*)/g;
const descriptionRegex = /((?:\[-\])|(?:\[\+\]))\s+(.*?)(?=(?:(?:\[+|-\]))|$)/gm;

function getSummary(summary) {
    const regex = summaryRegex;
    const m = regex.exec(summary);

    return m ? m[1] : null;
}

function formatTasksTextToArray(description) {
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
            const tasks = formatTasksTextToArray(event.description);
            const obj = {
                id: event.id,
                summary,
                created: moment(event.created).format('LL'),
                updated: moment(event.updated).format('LL'),
                date: event.start.date,
                completed: tasks.completed,
                incomplete: tasks.incomplete
            };

            result.push(obj);
        }
    });

    return result;
}

function formatTasksToText({ completed, incomplete }) {
    const completedDesc = completed.length ? `[+] ${completed.join('\n[+] ')}` : '';
    const incompleteDesc = incomplete.length ? `[-] ${incomplete.join('\n[-] ')}` : '';

    return incompleteDesc ?
        `${incompleteDesc}\n${completedDesc}` :
        `${completedDesc}`;
}

export default {
    formatList,
    formatTasksTextToArray,
    formatTasksToText
};
