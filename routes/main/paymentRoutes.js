import express from 'express';
import { createPayment , getPayment, getPaymentId, updateStatus } from '../../controller/main/paymentController.js';

const router = express.Router();

router.post('/create', createPayment);
router.get('/findId/:id', getPaymentId);
router.get('/search', getPayment);
router.put('/update/status/:id', updateStatus);

export default router;
