import express from 'express';
import { notificationController } from '../controllers/index';

const router = express.Router();

router.get('/:userId', notificationController.getNotifications);

export default router;
