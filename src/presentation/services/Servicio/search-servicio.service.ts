import { SearchServicioDto } from '../../../domain/dtos/servicio/search-servicio.dto';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';

export class SearchServicioService {
  constructor(private readonly servicioRepo: ServicioRepository) {}

  public async execute(data: SearchServicioDto) {
    const { trabajo, zona } = data;

    const servicios = await this.servicioRepo.searchServices(trabajo, zona);
    if (!servicios || servicios.length === 0) {
      throw new Error('No se encontraron servicios');
    }

    return {
      servicios,
    };
  }
}
