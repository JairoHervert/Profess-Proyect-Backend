import { CategoryEntity } from '../entities/category.entity';

export interface CategoryRepository {
  get(nombreCategoria: string): Promise<CategoryEntity>;
  getbyId(idCategoria: number): Promise<CategoryEntity>;
}
