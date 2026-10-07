import { Router } from 'express';
import * as controller from '../controllers/userController.js';

const router = Router();

router.post('/', controller.createUser);
router.get('/:id', controller.getUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;