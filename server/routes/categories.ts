import express from 'express';
import { categoryController } from '../controllers/index';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.insertCategory);


export default router;
