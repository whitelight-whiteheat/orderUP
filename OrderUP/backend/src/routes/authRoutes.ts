import { Router } from 'express';
import { 
  register, 
  login, 
  profile, 
  refresh, 
  logout 
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { 
  registerSchema, 
  loginSchema, 
  refreshSchema 
} from '../validators/authValidators';
import { validateRequest } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh', validateRequest(refreshSchema), refresh);

// Protected routes
router.get('/profile', authenticateToken, profile);
router.post('/logout', authenticateToken, logout);

export default router;
