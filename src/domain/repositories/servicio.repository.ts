import { CreateServicioDto } from '../dtos/servicio/create-servicio.dto';
import { ServicioEntity } from '../entities/servicio.entity';

export interface ServicioRepository {
  create(data: CreateServicioDto): Promise<ServicioEntity>;
}
