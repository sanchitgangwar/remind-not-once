import google from 'googleapis';
import formatters from './formatters';


function getEvent(calendarId, eventId, oauth2Client) {
    const calendar = google.calendar('v3');

    return new Promise((resolve, reject) => {
        calendar.events.get({
            auth: oauth2Client,
            calendarId,
            eventId
        }, (err, response) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                eventResource: response,
                tasks: formatters.formatTasksTextToArray(response.description)
            });
        });
    });
}

function markAsCompleted({ completed, incomplete }, task) {
    if (task) {
        const index = incomplete.indexOf(task);

        if (index === -1) {
            return {
                completed,
                incomplete
            };
        }

        return {
            completed: [
                task,
                ...completed
            ],
            incomplete: [
                ...incomplete.slice(0, index),
                ...incomplete.slice(index + 1)
            ]
        };
    }

    return {
        completed: [
            ...incomplete,
            ...completed
        ],
        incomplete: []
    };
}

function markAsIncomplete({ completed, incomplete }, task) {
    if (task) {
        const index = completed.indexOf(task);

        if (index === -1) {
            return {
                completed,
                incomplete
            };
        }

        return {
            completed: [
                ...completed.slice(0, index),
                ...completed.slice(index + 1)
            ],
            incomplete: [
                task,
                ...incomplete
            ]
        };
    }

    return {
        completed: [],
        incomplete: [
            ...completed,
            ...incomplete
        ]
    };
}

export default {
    getEvent,
    markAsIncomplete,
    markAsCompleted
};
