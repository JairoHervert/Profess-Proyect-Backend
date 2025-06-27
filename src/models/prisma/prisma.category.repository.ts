import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

const prisma = new PrismaClient();

export class PrismaCategoryRepository implements CategoryRepository {
  async get(nombreCategoria: string): Promise<CategoryEntity> {
    const category = await prisma.categoria.findUnique({
      where: { nombreCategoria },
    });

    if (!category) {
      throw new Error(`Category with name ${nombreCategoria} not found`);
    }

    return {
      idCategoria: category.idCategoria,
      nombreCategoria: category.nombreCategoria,
    };
  }

  async getbyId(idCategoria: number): Promise<CategoryEntity> {
    const category = await prisma.categoria.findUnique({
      where: { idCategoria },
    });

    if (!category) {
      throw new Error(`Category with ID ${idCategoria} not found`);
    }

    return {
      idCategoria: category.idCategoria,
      nombreCategoria: category.nombreCategoria,
    };
  }
}
