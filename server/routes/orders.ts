import express from 'express';
import { orderController } from '../controllers/index';

const router = express.Router();

router.post('/', orderController.insertOrder);
router.get('/order/:orderId', orderController.getOrderById);
router.get('/:userId/:status', orderController.getOrderByUserId);
router.patch('/', orderController.updateOrder);

export default router;