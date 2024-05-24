import express from 'express';
import { notificationController } from '../controllers/index';

const router = express.Router();

router.get('/:userId', notificationController.getNotifications);
router.patch('/:notificationId', notificationController.updateNotification);

export default router;
