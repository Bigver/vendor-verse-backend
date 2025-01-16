// routes/templateRoutes.js
import express from 'express';
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateByCategoryAndId,
  searchTemplate
} from '../../controller/restaurant/templateController.js';

const router = express.Router();

router.post('/', createTemplate); 
router.get('/', getAllTemplates); 
router.get('/search', searchTemplate); 
router.get('/:id', getTemplateById);
router.put('/:id', updateTemplate); 
router.delete('/:id', deleteTemplate); 
router.get("/category/:category/:template_id", getTemplateByCategoryAndId);

export default router;