import { Router } from 'express';
import { ClientController } from './client.controller';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware';

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClientController();

    router.post('/register', controller.registerClient);
    // router.get('/find/:correo', [AuthMiddleware.validateJWT], controller.findClientByCorreo);

    return router;
  }
}
