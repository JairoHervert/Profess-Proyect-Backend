import { Router } from 'express';
import { PrestamistaRoutes } from './prestamista/prestamista.routes';
import { ServicioRoutes } from './servicio/servicio.routes';
import { MessagesChatRoutes } from './messages/messages.routes';
import { ClientRoutes } from './client/client.routes';
import { UserRoutes } from './user/user.routes';
import { FileUploadRoutes } from './file-upload/file-upload.routes';
import { PrismaCategoryRepository } from './../models/prisma/prismaCategoryChargue';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/prestamista', PrestamistaRoutes.routes);
    router.use('/api/chat', MessagesChatRoutes.routes);
    router.use('/api/cliente', ClientRoutes.routes);
    router.use('/api/servicio', ServicioRoutes.routes);
    router.use('/api/user', UserRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);



    router.post('/api/load-categories', async (req, res) => {
      const categoryRepo = new PrismaCategoryRepository();

      try {
        await categoryRepo.cargarCategorias();
        res.status(200).send('Categorías cargadas correctamente.');
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
        res.status(500).send('Error al cargar las categorías.');
      }
    });

    return router;
  }
}
