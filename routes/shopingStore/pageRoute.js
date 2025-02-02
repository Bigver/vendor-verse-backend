import express from 'express';
import { createPage , getPage , editPage , editPageNavbar , editPageSection1 , editPageSection2 ,editPageSection3 ,editPageSection4 ,editPageSection5 ,editPageFooter, editPageSection6 , getCatagory, selectTemplate, editShipping } from '../../controller/shopingStore/pageController.js';

const router = express.Router();

router.post('/create', createPage);
router.get('/:nameStore', getPage);
router.put('/edit/:id', editPage);
router.put('/edit/navbar/:id', editPageNavbar);
router.put('/edit/section1/:id', editPageSection1);
router.put('/edit/section2/:id', editPageSection2);
router.put('/edit/section3/:id', editPageSection3);
router.put('/edit/section4/:id', editPageSection4);
router.put('/edit/section5/:id', editPageSection5);
router.put('/edit/section6/:id', editPageSection6);
router.put('/edit/shipping/:id', editShipping);
router.put('/edit/footer/:id', editPageFooter);
router.get('/category/:store_id', getCatagory);
router.put('/update/template/:store_id', selectTemplate);

export default router;
