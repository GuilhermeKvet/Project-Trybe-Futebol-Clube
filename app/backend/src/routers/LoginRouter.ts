import { Router } from 'express';
import validateJWT from '../middlewares/auth';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', loginController.login);
router.get('/validate', validateJWT, loginController.validate);

export default router;
