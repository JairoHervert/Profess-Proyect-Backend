import { Request, Response } from 'express';
import { PrismaCategoryRepository } from '../../models/prisma/prisma.category.chargue.temp';

export class CategoryController {
  // Metodo para cargar las categorias
  async loadCategory(req: Request, res: Response): Promise<void> {
    const categoryRepo = new PrismaCategoryRepository();
    
    try {
      // Llamar a la función que carga las categorías
      await categoryRepo.loadCategory();
      res.status(200).send('Categorías cargadas correctamente.');
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      res.status(500).send('Error al cargar las categorías.');
    }
  }
  // Metodo para obtener las categorias
  async getCategories(req: Request, res: Response): Promise<void> {
    const categoryRepo = new PrismaCategoryRepository();
    
    try {
      const categories = await categoryRepo.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      res.status(500).send('Error al obtener las categorías.');
    }
  }
}
