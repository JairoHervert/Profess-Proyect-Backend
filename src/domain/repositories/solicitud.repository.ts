import { CreateSolicitudDto } from '../dtos/solicitud-create.dto';
import { SolicitudEntity } from '../entities/solicitud.entity';

export interface SolicitudRepository {
  create(data: CreateSolicitudDto): Promise<SolicitudEntity>;
  delete(id: number): Promise<void>;
  // findById(id: number): Promise<SolicitudEntity | null>;
  // findByClienteId(clienteId: number): Promise<SolicitudEntity[]>;
  // findByServicioId(servicioId: number): Promise<SolicitudEntity[]>;
  // update(id: number, data: Partial<CreateSolicitudDto>): Promise<SolicitudEntity>;
  // delete(id: number): Promise<void>;
}