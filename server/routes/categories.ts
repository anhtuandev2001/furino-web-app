import express from 'express';
import { categoryController } from '../controllers/index';

const router = express.Router();

router.get('/', categoryController.getCategories);


export default router;
