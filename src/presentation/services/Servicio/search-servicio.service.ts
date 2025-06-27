import { SearchServicioDto } from '../../../domain/dtos/servicio/search-servicio.dto';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

export class SearchServicioService {
  constructor(
    private readonly servicioRepo: ServicioRepository,
    private readonly categoryRepo: CategoryRepository
  ) {}

  public async execute(data: SearchServicioDto) {
    const { trabajo, zona } = data;

    const servicios = await this.servicioRepo.searchServices(trabajo, zona);
    if (!servicios || servicios.length === 0) {
      throw new Error('No se encontraron servicios');
    }

    // Crear un nuevo array de servicios con la categoria agregada
    const serviciosConCategoria = await Promise.all(
      servicios.map(async servicio => {
        const categoria = await this.categoryRepo.getbyId(servicio.categoriaId);
        if (!categoria) {
          throw new Error(`Categoría con ID ${servicio.categoriaId} no encontrada`);
        }
        return {
          ...servicio,
          categoria: categoria.nombreCategoria,
        };
      })
    );

    return {
      servicios: serviciosConCategoria,
    };
  }
}
