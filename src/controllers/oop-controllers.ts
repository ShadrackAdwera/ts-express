import { Request, Response, NextFunction } from 'express';

import { get } from './decorators/routes';
import { controller } from './decorators/controller';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
      <div>
      <h2>You are logged in</h2>
      <br />
      <a href='/logout'>Log Out</a>
      <a href='/protected-route'>View Protected Resource</a>
      </div>
      `);
    } else {
      res.send(`
      <div>
      <h2>You are not logged in</h2>
      <br />
      <a href='/login'>Log In</a>
      </div>
      `);
    }
  }
}
