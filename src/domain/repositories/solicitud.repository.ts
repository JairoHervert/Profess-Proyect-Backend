import { CreateSolicitudDto } from '../dtos/solicitud-create.dto';
import { SolicitudEntity } from '../entities/solicitud.entity';

export interface SolicitudRepository {
  create(data: CreateSolicitudDto): Promise<SolicitudEntity>;
  delete(id: number): Promise<void>;
  getByIDClienteOrPrestamista(idUser: number): Promise<SolicitudEntity[]>;
  updateState(id: number, estado: string): Promise<SolicitudEntity>;
}