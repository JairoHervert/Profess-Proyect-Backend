import { CreateServicioDto } from '../dtos/servicio/create-servicio.dto';
import { ServicioEntity } from '../entities/servicio.entity';

export interface ServicioRepository {
  create(data: CreateServicioDto): Promise<ServicioEntity>;
  searchServices(trabajo: string, zona: string): Promise<ServicioEntity[]>;
  getServiceById(idPrestamista: number): Promise<ServicioEntity[]>;
  getByPrestamistaId(prestamistaId: number): Promise<ServicioEntity[]>;
}
