import express from 'express';
import { userController } from '../controllers/index';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/', userController.updateUser);
router.get('/:userId', userController.getUserById);

export default router;
