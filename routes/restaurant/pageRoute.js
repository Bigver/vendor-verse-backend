import express from 'express';
import { createPage , getPage , editPage , getCatagory, selectTemplate } from '../../controller/restaurant/pageController.js';

const router = express.Router();

router.post('/create', createPage);
router.get('/:nameStore', getPage);
router.put('/edit/:id', editPage);
router.get('/category/:store_id', getCatagory);
router.put('/update/template/:store_id', selectTemplate);

export default router;
