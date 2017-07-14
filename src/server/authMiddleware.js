import google from 'googleapis';

const config = require('config');

const plus = google.plus('v1');

function checkIfAuthenticated(req, res, next) {
    if (req.url.indexOf('auth/') !== -1) {
        next();
        return;
    }

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
            fields: 'displayName'
        }, (err) => {
            if (err) {
                res.cookie('token', '', { expires: new Date(null) });
                res.send(401);
                return;
            }

            next();
        });
    } else {
        res.send(401);
    }
}

export default checkIfAuthenticated;
