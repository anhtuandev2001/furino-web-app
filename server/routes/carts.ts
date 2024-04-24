import express from 'express';
import { cartController } from '../controllers/index';

const router = express.Router();

router.get('/:userId', cartController.getCarts);
router.post('/', cartController.insertCart);
router.delete('/:cartId', cartController.deleteCart);
router.patch('/:cartId', cartController.updateCart);

export default router;
