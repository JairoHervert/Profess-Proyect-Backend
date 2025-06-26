import { CompleteDataClientDto } from '../../../domain/dtos/client/client-completeData.dto';
import { ClientRepository } from '../../../domain/repositories/client.repository';

export class CompleteDataClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(data: CompleteDataClientDto) {
    const client = await this.clientRepo.completeData(data.id, {
      id: data.id,
      datosCompletos: true,
      nombre: data.nombre,
      telefono: data.telefono,
      telefonoSecundario: data.telefonoSecundario,
      tipoCuenta: data.tipoCuenta,
      linkFoto: data.linkFoto,
      fechaNacimiento: data.fechaNacimiento,
      preferenciasPago: data.preferenciasPago,
      horarios: data.horarios,
    });

    if (!client) {
      throw new Error('Error al completar datos');
    }

    return {
      id: client.id,
      datosCompletos: client.datosCompletos,
      nombre: client.nombre || undefined,
      telefono: client.telefono || undefined,
      telefonoSecundario: client.telefonoSecundario || undefined,
      tipoCuenta: client.tipoCuenta || undefined,
      linkFoto: client.linkFoto || undefined,
      fechaNacimiento: client.fechaNacimiento || undefined,
      preferenciasPago: client.preferenciasPago || undefined,
      horarios: client.horarios || undefined,
    };
  }
}
