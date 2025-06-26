import { CreateServicioDto } from '../../../domain/dtos/servicio/create-servicio.dto';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
export class CreateServicioService {
  constructor(
    private readonly servicioRepo: ServicioRepository,
    private readonly categoryRepo: CategoryRepository
  ) {}

  public async execute(data: CreateServicioDto) {
    // const category = await this.categoryRepo.get(data.categoria);
    // data.idCategoria = category.idCategoria;
    let category;
    try {
      category = await this.categoryRepo.get(data.categoria);
    } catch (error) {
      throw new Error(`Error al obtener la categoría ${data.categoria}: ${error}`);
    }
    data.idCategoria = category.idCategoria;
    const servicio = await this.servicioRepo.create(data);
    if (!servicio) {
      throw new Error('Error al crear el servicio');
    }
    console.log('Servicio creado:', servicio);
    return {
      servicio,
    };
  }
}
