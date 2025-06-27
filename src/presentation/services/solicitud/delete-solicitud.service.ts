import { SolicitudRepository } from '../../../domain/repositories/solicitud.repository';
import { CreateSolicitudDto } from '../../../domain/dtos/solicitud-create.dto';

export class DeleteSolicitudService {
  constructor(private readonly solicitudRepo: SolicitudRepository) {}

  async execute(id: number): Promise<void> {
    // Validar que el ID de la solicitud sea válido
    if (!id) {
      throw new Error('El ID de la solicitud es obligatorio');
    }

    // Eliminar la solicitud de contratación
    await this.solicitudRepo.delete(id);
  }
}