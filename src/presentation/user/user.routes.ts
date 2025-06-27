import { Router } from 'express';
import { UserAuthController } from './user.auth.controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserAuthController();

    router.post('/login', controller.login);
    router.post('/login-google', controller.loginGoogle);
    router.post('/logout', controller.logout);

    return router;
  }
}
