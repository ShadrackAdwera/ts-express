import { NextFunction, Request, Response } from 'express';

import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Just Passing Through . . . ');
  next();
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method='POST'>
    <div>
    <label name='email'>Email</label>
    <input name='email' type='email'/>
    </div>
    <div>
    <label name='password'>Password</label>
    <input name='password' type='password'/>
    </div>
    <button type='submit'>Submit</button>
    </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (
      email &&
      password &&
      email.trim().toLowerCase() === 'test@mail.com' &&
      password === 'password'
    ) {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else {
      res.send('Auth failed!');
    }
  }
}
