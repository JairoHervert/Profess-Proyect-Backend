import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { CompleteDataDto } from '../../../domain/dtos/prestamista/prestamista-completeData.dto';

export class CompleteDataService {
  constructor(private readonly prestamistaRepo: PrestamistaRepository) {}

  async execute(data: CompleteDataDto) {
    const prestamista = await this.prestamistaRepo.completeData(data.id, {
      id: data.id,
      nombre: data.nombre,
      telefono: data.telefono,
      descripcion: data.descripcion,
      linkFoto: data.linkFoto,
      datosCompletos: true,
    });

    if (!prestamista) {
      throw new Error('Error al completar datos');
    }

    return {
      id: prestamista.id,
      datosCompletos: prestamista.datosCompletos,
      nombre: prestamista.nombre || undefined,
      telefono: prestamista.telefono || undefined,
      descripcion: prestamista.descripcion || undefined,
      linkFoto: prestamista.linkFoto || undefined,
    };
  }
}
