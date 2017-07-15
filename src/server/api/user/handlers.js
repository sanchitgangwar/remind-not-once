import google from 'googleapis';

const config = require('config');

const plus = google.plus('v1');

function getDetails(req, res) {
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

        plus.people.get({
            userId: 'me',
            auth: oauth2Client,
            fields: 'displayName,image'
        }, (err, response) => {
            if (err) {
                res.cookie('token', '', { expires: new Date(null), path: '/' });
                res.status(401).send(err);
                return;
            }

            res.status(200).send(response);
        });
    } else {
        res.status(401).send();
    }
}

export default {
    getDetails
};
