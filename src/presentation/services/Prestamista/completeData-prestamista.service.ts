import { PrestamistaRepository } from '../../../domain/repositories/prestamista.repository';
import { CompleteDataDto } from '../../../domain/dtos/prestamista/prestamista-completeData.dto';

export class CompleteDataService {
  constructor(private readonly prestamistaRepo: PrestamistaRepository) {}

  async execute(data: CompleteDataDto) {
    const prestamista = await this.prestamistaRepo.completeData(data.id, {
      id: data.id,
      datosCompletos: true,
      nombre: data.nombre,
      telefono: data.telefono,
      telefonoSecundario: data.telefonoSecundario,
      tipoCuenta: data.tipoCuenta,
      descripcion: data.descripcion,
      linkFoto: data.linkFoto,
      fechaNacimiento: data.fechaNacimiento,
      preferenciasPago: data.preferenciasPago,
      horarios: data.horarios,
      redesSociales: data.redesSociales,
    });

    if (!prestamista) {
      throw new Error('Error al completar datos');
    }

    return {
      id: prestamista.id,
      datosCompletos: prestamista.datosCompletos,
      nombre: prestamista.nombre || undefined,
      telefono: prestamista.telefono || undefined,
      telefonoSecundario: prestamista.telefonoSecundario || undefined,
      tipoCuenta: prestamista.tipoCuenta || undefined,
      descripcion: prestamista.descripcion || undefined,
      linkFoto: prestamista.linkFoto || undefined,
      fechaNacimiento: prestamista.fechaNacimiento || undefined,
      preferenciasPago: prestamista.preferenciasPago || undefined,
      horarios: prestamista.horarios || undefined,
      redesSociales: prestamista.redesSociales || undefined,
    };
  }
}
