import { Router } from 'express';
import { PrestamistaRoutes } from './prestamista/prestamista.routes';
import { ServicioRoutes } from './servicio/servicio.routes';
import { MessagesChatRoutes } from './messages/messages.routes';
import { ClientRoutes } from './client/client.routes';
import { UserRoutes } from './user/user.routes';
import { FileUploadRoutes } from './file-upload/file-upload.routes';
import { CategoryRoutes } from './categoria/category.routes';
import { SolicitudRoutes } from './solicitud/solicitud.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/prestamista', PrestamistaRoutes.routes);
    router.use('/api/chat', MessagesChatRoutes.routes);
    router.use('/api/cliente', ClientRoutes.routes);
    router.use('/api/servicio', ServicioRoutes.routes);
    router.use('/api/user', UserRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);

    router.use('/api/solicitud', SolicitudRoutes.routes);

    router.use('/api/category', CategoryRoutes.routes);

    return router;
  }
}
