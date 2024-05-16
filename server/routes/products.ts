import express from 'express';
import { productController } from '../controllers/index';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/getCount', productController.getCount);
router.patch('/', productController.updateProduct);
router.post('/', productController.insertProduct);
router.delete('/:productId', productController.deleteProduct);
router.get('/:productId', productController.getProductById);
router.post('/getCarts', productController.getCarts);
router.get('/search/:keyword', productController.searchProduct);

export default router;
