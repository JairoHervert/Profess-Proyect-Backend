import { SolicitudRepository } from '../../../domain/repositories/solicitud.repository';
import { CreateSolicitudDto } from '../../../domain/dtos/solicitud-create.dto';

export class CreateSolicitudService {
  constructor(private readonly solicitudRepo: SolicitudRepository) {}

  async execute(data: CreateSolicitudDto) {
    // Validar que el cliente y el servicio existan
    if (!data.id_cliente || !data.id_servicio) {
      throw new Error('El cliente y el servicio son obligatorios');
    }

    // Crear la solicitud de contratación
    const solicitud = await this.solicitudRepo.create(data);
    return solicitud;
  }
}