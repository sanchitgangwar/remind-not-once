import google from 'googleapis';

const config = require('config');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    config.get('google.clientId'),
    config.get('google.clientSecret'),
    config.get('google.redirectUrl')
);


function login(req, res) {
    const scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/calendar'
    ];
    const url = oauth2Client.generateAuthUrl({
        scope: scopes
    });

    res.send(200, {
        url
    });
}

function oauth2callback(req, res) {
    const code = req.query.code;
    const error = req.query.error;

    if (error) {
        res.redirect('/');
        return;
    }

    oauth2Client.getToken(code, (err, tokens) => {
        if (!err) {
            res.cookie('token', tokens.access_token, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.cookie('RT', tokens.refresh_token, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
}

function logout(req, res) {
    res.send(200);
}

export default {
    login,
    oauth2callback,
    logout
};
