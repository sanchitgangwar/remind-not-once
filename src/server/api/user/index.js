import express from 'express';

import handlers from './handlers';

const router = express.Router();

router.get('/details', handlers.getDetails);

export default router;
