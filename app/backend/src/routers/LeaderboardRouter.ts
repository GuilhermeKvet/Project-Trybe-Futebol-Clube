import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', leaderboardController.getHomeTeams);
router.get('/away', leaderboardController.getAwayTeams);
router.get('/', leaderboardController.getAllTeams);

export default router;
