import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const router = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.findAll);
router.get('/:id', teamsController.findById);

export default router;
