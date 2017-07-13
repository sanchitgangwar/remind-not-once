import google from 'googleapis';

function login(req, res) {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
        // Client ID
        '531852830993-246k3nsjd19mda91djkgr0dhvtn45e6o.apps.googleusercontent.com',

        // Client Secret
        'U6myGNl7YDG1MgeHpy5YG1bU',

        // Redirect URL
        'http://localhost:12000/api/auth/oauth2callback'
    );

    const scope = 'https://www.googleapis.com/auth/calendar';
    const url = oauth2Client.generateAuthUrl({
        scope
    });


    res.send(200, {
        url
    });
}

function oauth2callback(req, res) {
    res.send(200);
}

function logout(req, res) {
    res.send(200);
}

export default {
    login,
    oauth2callback,
    logout
};
