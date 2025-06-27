import { Router } from 'express';
import { SolicitudController } from './solicitud.controller';

export class SolicitudRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SolicitudController();

    // Definir la ruta para crear una solicitud
    router.post('/create', controller.createSolicitud);
    router.post('/delete/:id', controller.deleteSolicitud);

    return router;
  }
}
