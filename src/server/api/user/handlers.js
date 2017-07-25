import google from 'googleapis';

import oauth from 'Server/api/oauth2';

import formatters from './formatters';

const plus = google.plus('v1');

function getDetails(req, res) {
    const oauth2Client = oauth.getClient(req);
    plus.people.get({
        userId: 'me',
        auth: oauth2Client,
        fields: 'displayName,image,emails'
    }, (err, response) => {
        if (err) {
            res.cookie('T', '', { expires: new Date(null), path: '/' });
            res.status(401).send(err);
            return;
        }

        res.status(200).send(formatters.formatDetails(response));
    });
}

export default {
    getDetails
};
