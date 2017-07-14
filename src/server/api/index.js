import express from 'express';

import authEndpoints from './auth';
import userEndpoints from './user';

const router = express.Router();

router.use('/auth', authEndpoints);
router.use('/user', userEndpoints);

export default router;
