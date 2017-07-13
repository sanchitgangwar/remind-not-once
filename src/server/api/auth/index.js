import express from 'express';

import handlers from './handlers';

const router = express.Router();

router.post('/login', handlers.login);
router.get('/logout', handlers.logout);
router.get('/oauth2callback', handlers.oauth2callback);

export default router;
