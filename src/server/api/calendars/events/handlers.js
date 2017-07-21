import google from 'googleapis';
import moment from 'moment';
import _pick from 'lodash/pick';

import oauth from 'Server/api/oauth2';
import helpers from './helpers';
import formatters from './formatters';

function getList(req, res) {
    const oauth2Client = oauth.getClient(req);
    const calendar = google.calendar('v3');

    let date = moment(new Date());
    if (req.query.date) {
        date = moment(date, 'YYYY-MM-DD');
    }

    const { calendarId = 'primary' } = req.params;
    const timeMin = date.startOf('day').format();
    const timeMax = date.end('day').format();
    req.log.info('Getting events list: ', {
        calendarId,
        timeMin,
        timeMax,
        orderBy: 'updated'
    });

    calendar.events.list({
        auth: oauth2Client,
        calendarId,
        timeMin,
        timeMax,
        orderBy: 'updated'
    }, (err, response) => {
        if (err) {
            res.status(err.code || 500).send(err);
            return;
        }

        res.send(formatters.formatList(response));
    });
}

function createEvent(req, res) {
    const oauth2Client = oauth.getClient(req);
    const calendar = google.calendar('v3');
    const { calendarId } = req.params;

    const requestBodies = formatters.getCreateRequestBodies(req.body);
    const nRequests = requestBodies.length;

    const promises = [];
    for (let i = 0; i < nRequests; ++i) {
        req.log.info('Creating Event: ', {
            calendarId,
            resource: requestBodies[i]
        });

        promises.push(new Promise((resolve, reject) => {
            calendar.events.insert({
                auth: oauth2Client,
                calendarId,
                resource: requestBodies[i]
            }, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(response);
            });
        }));
    }

    Promise.all(promises).then((responses) => {
        res.status(200).send(responses);
    }, (err) => {
        res.status(500).send(err);
    });
}

function updateEvent(req, res) {
    if (req.query.op !== 'DONE') {
        res.status(400).send({
            error: 'Invalid operation specified.'
        });
        return;
    }

    const oauth2Client = oauth.getClient(req);
    const calendar = google.calendar('v3');
    const { calendarId, eventId } = req.params;

    helpers.getEvent(calendarId, eventId, oauth2Client).then(({
        eventResource, tasks
    }) => {
        let newTasks;

        if (req.query.op === 'DONE') {
            newTasks = helpers.markAsCompleted(tasks);
        }

        const newDescription = formatters.formatTasksToText(newTasks);
        const newResource = _pick(eventResource, [
            'attendeesOmitted',
            'colorId',
            'start',
            'end',
            'reminders',
            'attachments',
            'attendees',
            'extendedProperties',
            'gadget',
            'guestsCanInviteOthers',
            'guestsCanSeeOtherGuests',
            'location',
            'originalStartTime',
            'recurrence',
            'sequence',
            'source',
            'status',
            'summary',
            'transparency',
            'visibility'
        ]);
        newResource.description = newDescription;

        req.log.info('Updating event: ', {
            calendarId,
            eventId,
            resource: newResource
        });

        calendar.events.update({
            auth: oauth2Client,
            calendarId,
            eventId,
            resource: newResource
        }, (err) => {
            if (err) {
                res.status(err.code || 500).send(err);
                return;
            }

            res.status(200).send(newTasks);
        });
    }, (err) => {
        res.status(err.code || 500).send(err);
    });
}

function updateTask(req, res) {
    if (req.query.op !== 'DONE' && req.query.op !== 'UNDO') {
        res.status(400).send({
            error: 'Invalid operation specified.'
        });
        return;
    }

    const oauth2Client = oauth.getClient(req);
    const calendar = google.calendar('v3');
    const { calendarId, eventId } = req.params;

    helpers.getEvent(calendarId, eventId, oauth2Client).then(({
        eventResource, tasks
    }) => {
        let newTasks;

        if (req.query.op === 'DONE') {
            newTasks = helpers.markAsCompleted(tasks, req.body.task);
        } else {
            newTasks = helpers.markAsIncomplete(tasks, req.body.task);
        }

        const newDescription = formatters.formatTasksToText(newTasks);
        const newResource = _pick(eventResource, [
            'attendeesOmitted',
            'colorId',
            'start',
            'end',
            'reminders',
            'attachments',
            'attendees',
            'extendedProperties',
            'gadget',
            'guestsCanInviteOthers',
            'guestsCanSeeOtherGuests',
            'location',
            'originalStartTime',
            'recurrence',
            'sequence',
            'source',
            'status',
            'summary',
            'transparency',
            'visibility'
        ]);
        newResource.description = newDescription;

        req.log.info('Updating task: ', {
            calendarId,
            eventId,
            resource: newResource
        });

        calendar.events.update({
            auth: oauth2Client,
            calendarId,
            eventId,
            resource: newResource
        }, (err) => {
            if (err) {
                res.status(err.code || 500).send(err);
                return;
            }

            res.status(200).send(newTasks);
        });
    }, (err) => {
        res.status(err.code || 500).send(err);
    });
}

export default {
    getList,
    createEvent,
    updateEvent,
    updateTask
};
