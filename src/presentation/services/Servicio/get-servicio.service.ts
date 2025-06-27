import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

export class GetServicioService {
  constructor(
    private readonly servicioRepo: ServicioRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly prestamistaRepo: PrestamistaRepository
  ) {}

  async execute(id: number) {
    const prestamista = await this.prestamistaRepo.getDataById(id);

    if (!prestamista) {
      throw new Error('Prestamista no encontrado');
    }

    const servicios = await this.servicioRepo.getByPrestamistaId(id);

    const servicios_categoria = await Promise.all(
      servicios.map(async servicio => {
        const categoria = await this.categoryRepo.getbyId(servicio.categoriaId);
        return {
          ...servicio,
          categoria: categoria ? categoria.nombreCategoria : null,
        };
      })
    );

    return servicios_categoria;
  }
}
