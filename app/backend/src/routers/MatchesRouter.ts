import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAll);

export default router;
