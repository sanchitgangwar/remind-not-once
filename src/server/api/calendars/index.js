import express from 'express';

import handlers from './handlers';

const router = express.Router();

router.get('/list', handlers.getList);

export default router;
