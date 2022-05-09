import { HttpError } from '@adwesh/common';
import express, { Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import { loginRoutes } from './routes/login-routes';

import { router as controllerRouter } from './controllers/decorators/controller';
import './controllers/oop-controllers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['cookie'],
  })
);
//app.use('', loginRoutes);
app.use(controllerRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new HttpError('Method / Route does not exist!', 404));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(500)
    .json({ message: error.message || 'An error occured, try again' });
});

app.listen(5000, () => console.log('Listening on port: 5000'));
