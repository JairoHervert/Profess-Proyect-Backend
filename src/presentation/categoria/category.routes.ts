import { Router } from 'express';
import { CategoryController } from './category.controller';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CategoryController();

    router.post('/load', controller.loadCategory);
    router.get('/get-categories', controller.getCategories);

    return router;
  }
}
