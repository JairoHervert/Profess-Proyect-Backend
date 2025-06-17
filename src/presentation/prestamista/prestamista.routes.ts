import { Router } from 'express';
import { PrestamistaAuthController } from './prestamista.auth.controller';

export class PrestamistaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PrestamistaAuthController();

    router.post('/register', controller.registerPrestamista);
    router.post('/login', controller.loginPrestamista);
    router.post('/register-google', controller.registerGooglePrestamista);
    router.post('/login-google', controller.loginPrestamistaGoogle);
    return router;
  }
}
