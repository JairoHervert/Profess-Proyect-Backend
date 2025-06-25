import { CreateServicioDto } from '../../../domain/dtos/servicio/create-servicio.dto';
import { ServicioRepository } from '../../../domain/repositories/servicio.repository';
// import { ServicioEntity } from "../../../domain/entities/servicio.entity";

export class CreateServicioService {
  constructor(private readonly servicioRepo: ServicioRepository) {}

  public async execute(data: CreateServicioDto) {
    const servicio = await this.servicioRepo.create(data);
    if (!servicio) {
      throw new Error('Error al crear el servicio');
    }
    return {
      servicio,
    };
  }
}
