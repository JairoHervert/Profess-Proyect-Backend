import { Router } from 'express';
import { ClientController } from './client.controller';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware.cookies';

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClientController();

    router.post('/register', controller.registerClient);
    router.post('/register-google', controller.registerGoogleClient);
    router.put('/complete-data', [AuthMiddleware.validateJWT], controller.completeData);
    router.get('/get-data/:id', [AuthMiddleware.validateJWT], controller.getData);
    // router.get('/find/:correo', [AuthMiddleware.validateJWT], controller.findClientByCorreo);

    return router;
  }
}
