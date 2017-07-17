import express from 'express';

import handlers from './handlers';

const router = express.Router({
    mergeParams: true
});

router.get('/list', handlers.getList);
router.put('/:eventId', handlers.updateEvent);
router.put('/:eventId/tasks', handlers.updateTask);

export default router;
