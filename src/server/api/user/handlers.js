import google from 'googleapis';

const config = require('config');

const plus = google.plus('v1');

function getDetails(req, res) {
    console.log('\n\n\n\n COOKIES are: ', JSON.stringify(req.cookies, null, 4));
    console.log('\n\n\nTOKEN: ', req.cookies.token);
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
                res.send(401, err);
                return;
            }

            res.send(response);
        });
    } else {
        res.send(401);
    }
}

export default {
    getDetails
};
