import express from 'express';

import authEndpoints from './auth';

const router = express.Router();

router.use('/auth', authEndpoints);

export default router;
