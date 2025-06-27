import { Router } from 'express';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from '../services/File-Upload/file-upload.service';
import { FileUploadMiddleware } from '../middleware/file-upload.middleware,';
import { TypeMiddleware } from '../middleware/type.middleware';
import { AuthMiddleware } from '../middleware/prestamista.auth.middleware.cookies';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController(new FileUploadService());

    router.post(
      '/single/:type',
      [AuthMiddleware.validateJWT],
      FileUploadMiddleware.containFiles,
      TypeMiddleware.validTypes(['users', 'services', 'chat-uploads']),
      controller.uploadFile
    );

    return router;
  }
}
