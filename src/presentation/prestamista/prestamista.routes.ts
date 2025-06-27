import { Router } from 'express';
import { PrestamistaAuthController } from './prestamista.auth.controller';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware.cookies';

export class PrestamistaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PrestamistaAuthController();

    router.post('/register', controller.registerPrestamista);
    router.post('/register-google', controller.registerGooglePrestamista);
    router.put('/complete-data', [AuthMiddleware.validateJWT], controller.completeData);
    router.get('/get-data/:id', [AuthMiddleware.validateJWT], controller.getData);
    return router;
  }
}
