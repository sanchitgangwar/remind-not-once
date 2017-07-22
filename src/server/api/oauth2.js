import google from 'googleapis';
import config from 'config';

function getClient(req) {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        config.get('google.clientId'),
        config.get('google.clientSecret'),
        config.get('google.redirectUrl')
    );

    if (req && req.cookies) {
        oauth2Client.setCredentials({
            access_token: req.cookies.T,
            refresh_token: req.cookies.RT
        });
    }

    return oauth2Client;
}

export default {
    getClient
};
