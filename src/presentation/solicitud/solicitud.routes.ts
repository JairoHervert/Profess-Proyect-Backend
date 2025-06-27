import { Router } from 'express';
import { SolicitudController } from './solicitud.controller';

export class SolicitudRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SolicitudController();

    // Definir la ruta para crear una solicitud
    router.post('/create', controller.createSolicitud);
    router.delete('/delete/:id', controller.deleteSolicitud);
    router.get('/get-by-user/:idUser', controller.getSolicitudesByUser);
    router.put('/update-state/:id/:estado', controller.updateSolicitudState);

    return router;
  }
}
