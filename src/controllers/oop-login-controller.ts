import { Request, Response } from 'express';

import { get, controller } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
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
}
