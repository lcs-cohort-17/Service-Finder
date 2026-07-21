import express from 'express';
import * as serviceController from '../controllers/serviceController.js';

const router = express.Router();

// Keep static routes above /:id so they are not treated as service IDs.
router.get('/search', serviceController.searchServices);
router.get('/suggestions/pending', serviceController.getPendingSuggestions);
router.post('/suggestions', serviceController.createSuggestion);
router.get('/suggestions/:id', serviceController.getSuggestionById);
router.post('/suggestions/:id/approve', serviceController.approveSuggestion);
router.post('/suggestions/:id/reject', serviceController.rejectSuggestion);
router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.get('/:id', serviceController.getServiceById);

export default router;