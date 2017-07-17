import express from 'express';

import handlers from './handlers';
import eventsEndpoints from './events';

const router = express.Router();

router.get('/list', handlers.getList);
router.use('/:calendarId/events', eventsEndpoints);

export default router;
