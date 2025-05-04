import express from 'express';
import {
  getListUseProbs,
  getListUseProbById,
  createListUseProb,
  updateListUseProb,
  deleteListUseProb,
} from '../controllers/listUseProbController.js';

const router = express.Router();

router.get('/', getListUseProbs);
router.get('/:id', getListUseProbById);
router.post('/', createListUseProb);
router.put('/:id', updateListUseProb);
router.delete('/:id', deleteListUseProb);

export default router;