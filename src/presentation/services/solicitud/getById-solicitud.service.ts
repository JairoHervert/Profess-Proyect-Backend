import { SolicitudRepository } from '../../../domain/repositories/solicitud.repository';
import { CreateSolicitudDto } from '../../../domain/dtos/solicitud-create.dto';
import { SolicitudEntity } from '../../../domain/entities/solicitud.entity';

export class GetByIDUserOrPrestamistaService {
  constructor(private readonly solicitudRepo: SolicitudRepository) {}

  async execute(idUser: number): Promise<SolicitudEntity[]> {
    // Validar que el ID del usuario sea válido
    if (!idUser) {
      throw new Error('El ID del usuario es obligatorio');
    }

    // Obtener todas las solicitudes de contratación por ID de cliente o prestamista
    const solicitudes = await this.solicitudRepo.getByIDClienteOrPrestamista(idUser);
    
    // Verificar si se encontraron solicitudes
    if (solicitudes.length === 0) {
      throw new Error('No se encontraron solicitudes para este usuario');
    }

    return solicitudes;
  }
}