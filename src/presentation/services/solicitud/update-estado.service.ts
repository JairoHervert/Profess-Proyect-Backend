import { SolicitudRepository } from '../../../domain/repositories/solicitud.repository';
import { SolicitudEntity } from '../../../domain/entities/solicitud.entity';

export class UpdateEstadoSolicitudService {
  constructor(private readonly solicitudRepo: SolicitudRepository) {}

  async execute(id: number, estado: string): Promise<SolicitudEntity> {
    // Validar que el ID de la solicitud y el estado sean válidos
    if (!id || !estado) {
      throw new Error('El ID de la solicitud y el estado son obligatorios');
    }

    // Actualizar el estado de la solicitud de contratación
    const updatedSolicitud = await this.solicitudRepo.updateState(id, estado);
    
    // Verificar si se actualizó correctamente
    if (!updatedSolicitud) {
      throw new Error('No se pudo actualizar el estado de la solicitud');
    }

    return updatedSolicitud;
  }
}