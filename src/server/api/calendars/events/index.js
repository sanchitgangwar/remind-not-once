import express from 'express';

import handlers from './handlers';

const router = express.Router({
    mergeParams: true
});

router.get('/', handlers.getList);
router.post('/', handlers.createEvent);
router.put('/:eventId', handlers.updateEvent);
router.put('/:eventId/tasks', handlers.updateTask);

export default router;
