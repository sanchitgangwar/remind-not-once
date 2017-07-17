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

    calendar.events.list({
        auth: oauth2Client,
        calendarId: req.params.calendarId || 'primary',
        timeMin: date.startOf('day').format(),
        timeMax: date.endOf('day').format()
    }, (err, response) => {
        if (err) {
            res.status(err.code || 500).send(err);
            return;
        }

        res.send(formatters.formatList(response));
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

        calendar.events.update({
            auth: oauth2Client,
            calendarId: req.params.calendarId,
            eventId: req.params.eventId,
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

        calendar.events.update({
            auth: oauth2Client,
            calendarId: req.params.calendarId,
            eventId: req.params.eventId,
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
    updateEvent,
    updateTask
};
