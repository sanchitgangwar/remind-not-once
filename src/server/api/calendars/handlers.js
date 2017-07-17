import google from 'googleapis';

import oauth from 'Server/api/oauth2';

import formatters from './formatters';

function getList(req, res) {
    const oauth2Client = oauth.getClient(req);

    const calendar = google.calendar('v3');
    calendar.calendarList.list({
        auth: oauth2Client
    }, (err, response) => {
        if (err) {
            res.status(err.code || 500).send(err);
            return;
        }

        res.status(200).send(formatters.calendarsList(response));
    });
}

export default {
    getList
};
