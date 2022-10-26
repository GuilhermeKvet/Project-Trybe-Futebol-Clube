import { Router } from 'express';
import hasTeamMiddleware from '../middlewares/hasTeam';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import validateJWT from '../middlewares/auth';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAll);
router.post('/', hasTeamMiddleware, validateJWT, matchesController.create);
router.patch('/:id/finish', matchesController.finished);

export default router;
