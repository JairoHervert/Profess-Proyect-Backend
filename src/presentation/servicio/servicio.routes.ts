import { Router } from 'express';
import { ServicioController } from './servicio.controller';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware.cookies';

export class ServicioRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ServicioController();

    router.post('/create', [AuthMiddleware.validateJWT], controller.createServicio);
    router.get('/search', [AuthMiddleware.validateJWT], controller.searchServicio);
    return router;
  }
}
