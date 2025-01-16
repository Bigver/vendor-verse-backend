import express from 'express';
import { createStoreOwner , getStoreOwner, getStoreOwnerAll , getStoreOwnerId, updateStoreOwner } from '../../controller/main/storeOwnerController.js';
import { adminMiddleware , authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create/store', createStoreOwner);
router.get('/:user_id', getStoreOwner);
router.get('/search/all', adminMiddleware ,  getStoreOwnerAll);
router.put('/:store_id', updateStoreOwner);
router.get('/findId/:store_id',  getStoreOwnerId);

export default router;