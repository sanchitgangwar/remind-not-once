import oauth from 'Server/api/oauth2';

const oauth2Client = oauth.getClient();


function login(req, res) {
    const scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/calendar'
    ];
    const url = oauth2Client.generateAuthUrl({
        scope: scopes
    });

    res.status(200).send({
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
    res.cookie('token', '', { expires: new Date(null) });
    res.cookie('RT', '', { expires: new Date(null) });

    res.redirect('/login');
}

export default {
    login,
    oauth2callback,
    logout
};
