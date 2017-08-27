import moment from 'moment';

function getSummary(summary) {
    const regex = /^(?:\[R\+\])\s+(.*)/g;
    const m = regex.exec(summary);

    return m ? m[1] : null;
}

function formatTasksTextToArray(description) {
    const regex = /((?:\[-\])|(?:\[\+\]))\s+(.*?)(?=(?:(?:\[+|-\]))|$)/gm;

    const tasks = {
        completed: [],
        incomplete: []
    };

    let m;

    // eslint-disable-next-line no-cond-assign
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
                created: moment(event.created).format('ll'),
                updated: moment(event.updated).format('ll'),
                startDate: event.start.date,
                endDate: event.end.date,
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

function getCreateRequestBodies({ eventName, tasks, occurrences }) {
    const requestBodies = new Array(occurrences.length);
    const completed = [];
    const incomplete = [];
    const nTasks = tasks.length;

    for (let i = 0; i < nTasks; ++i) {
        if (tasks[i].completed) {
            completed.push(tasks[i].name);
        } else {
            incomplete.push(tasks[i].name);
        }
    }

    const description = formatTasksToText({ completed, incomplete });
    for (let i = occurrences.length - 1; i >= 0; --i) {
        requestBodies[i] = {
            start: {
                date: occurrences[i].startDate
            },
            end: {
                date: moment(occurrences[i].endDate).add(1, 'days').format('YYYY-MM-DD')
            },
            summary: `[R+] ${eventName}`,
            reminders: {
                useDefault: false
            },
            description
        };
    }

    return requestBodies;
}

export default {
    formatList,
    formatTasksTextToArray,
    formatTasksToText,
    getCreateRequestBodies
};
