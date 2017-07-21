import google from 'googleapis';
import config from 'config';
// const config = require('config');

console.info('=====>>>>>>> ');
console.log(config.get('google.clientId'));

function getClient(req) {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.get('google.clientId'),
        config.get('google.clientSecret'),
        config.get('google.redirectUrl')
    );

    if (req && req.cookies) {
        oauth2Client.setCredentials({
            access_token: req.cookies.token
        });
    }

    return oauth2Client;
}

export default {
    getClient
};
