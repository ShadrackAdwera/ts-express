import { Request, Response, NextFunction } from 'express';

import { get } from './decorators/routes';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const login = (req: RequestWithBody, res: Response, next: NextFunction) => {
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
};

const loginHandler = (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
) => {
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
};

const home = (req: Request, res: Response, next: NextFunction) => {
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
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session = undefined;
  res.redirect('/');
};

const protectedHandler = (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <div>
    <h2>You are viewing a protected resource</h2>
    <br />
    <a href='/'>Home</a>
    </div>`);
};

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

export { login, loginHandler, home, logout, protectedHandler };
