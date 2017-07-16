import google from 'googleapis';

import formatters from './formatters';

const config = require('config');

function getList(req, res) {
    if (req.cookies && req.cookies.token) {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            config.get('google.clientId'),
            config.get('google.clientSecret'),
            config.get('google.redirectUrl')
        );

        oauth2Client.setCredentials({
            access_token: req.cookies.token
        });

        const calendar = google.calendar('v3');
        calendar.events.list({
            auth: oauth2Client,
            calendarId: req.params.calendarId || 'primary',
            timeMin: (new Date()).toISOString()
        }, (err, response) => {
            if (err) {
                res.status(err.code || 500).send(status);
                return;
            }

            res.status(200).send(formatters.formatList(response));
        });
    } else {
        res.status(401).send();
    }
}

export default {
    getList
};
