import express from 'express';

import handlers from './handlers';

const router = express.Router();

router.get('/', handlers.getDetails);

export default router;
