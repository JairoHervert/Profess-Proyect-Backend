import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { CreateClientDto } from '../../domain/dtos/client-register.dto';
import { ClientEntity } from '../../domain/entities/client-entity';

const prisma = new PrismaClient();

export class PrismaClientRepository implements ClientRepository {
  async create(data: CreateClientDto): Promise<ClientEntity> {
    const cliente = await prisma.cliente.create({ data });

    return {
      id: cliente.idCliente,
      correo: cliente.correo,
      contraseña: cliente.contraseña,
      correoVerificado: cliente.correoVerificado,
      datosCompletos: cliente.datosCompletos,
      telefono: cliente.telefono ?? undefined,
      tipoEntidad: cliente.tipoEntidad ?? undefined,
      descripcion: cliente.descripcion ?? undefined,
      linkFoto: cliente.linkFoto ?? undefined,
      calificacion: cliente.calificacion ?? undefined,
      nombre: cliente.nombre ?? undefined,
    };
  }

  async findByCorreo(correo: string): Promise<ClientEntity | null> {
    const client = await prisma.cliente.findUnique({
      where: { correo },
    });

    if (!client) return null;

    return {
      id: client.idCliente,
      correo: client.correo,
      contraseña: client.contraseña,
      correoVerificado: client.correoVerificado,
      datosCompletos: client.datosCompletos,
      telefono: client.telefono ?? undefined,
      tipoEntidad: client.tipoEntidad ?? undefined,
      descripcion: client.descripcion ?? undefined,
      linkFoto: client.linkFoto ?? undefined,
      calificacion: client.calificacion ?? undefined,
      nombre: client.nombre ?? undefined,
    };
  }
}
