import express, { Request, Response, NextFunction } from 'express';
import {
  login,
  loginHandler,
  home,
  logout,
  protectedHandler,
} from '../controllers/login-controller';

const router = express.Router();

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send(`
  <div>
    <h2>You are not authorized to view this page!</h2>
    <br />
    <a href='/login'>Log In</a>
    </div>
  `);
};

router.get('/', home);
router.get('/login', login);
router.get('/logout', logout);
router.post('/login', loginHandler);
router.use(checkAuth);
router.get('/protected-route', protectedHandler);

export { router as loginRoutes };
