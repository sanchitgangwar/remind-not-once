import express from 'express';

import authEndpoints from './auth';
import userEndpoints from './user';
import calendarEndpoints from './calendars';

const router = express.Router();

router.use('/auth', authEndpoints);
router.use('/user', userEndpoints);
router.use('/calendars', calendarEndpoints);

export default router;
