import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { CreateClientDto } from '../../domain/dtos/client-register.dto';
import { ClientEntity } from '../../domain/entities/client-entity';
import { PrestamistaEntity } from "../../domain/entities/prestamista.entity";

const prisma = new PrismaClient();

export class PrismaClientRepository implements ClientRepository {
  async create(data: CreateClientDto): Promise<ClientEntity> {
    const client = await prisma.cliente.create({ data });

    return {
      id: client.idCliente,
      nombre: client.nombre,
      correo: client.correo,
      telefono: client.telefono,
      contraseña: client.contraseña,
      tipoEntidad: client.tipoEntidad,
      calificacion: client.calificacion ?? undefined,
      linkFoto: client.linkFoto ?? undefined
    };
  }

  async findByCorreoInClient(correo: string): Promise<ClientEntity | null> {
    const client = await prisma.cliente.findUnique({
      where: { correo },
    });

    if (!client) return null;

    return {
      id: client.idCliente,
      nombre: client.nombre,
      correo: client.correo,
      telefono: client.telefono,
      contraseña: client.contraseña,
      tipoEntidad: client.tipoEntidad,
      calificacion: client.calificacion ?? undefined,
      linkFoto: client.linkFoto ?? undefined
    };
  }

  async findByCorreoInPrestamista(correo: string): Promise<PrestamistaEntity | null> {
    const prestamista = await prisma.prestamista.findUnique({
      where: { correo },
    });

    if (!prestamista) return null;

    return {
      id: prestamista.idPrestamista,
      correo: prestamista.correo,
      telefono: prestamista.telefono,
      tipoEntidad: prestamista.tipoEntidad,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      calificacion: prestamista.calificacion ?? undefined,
      nombre: prestamista.nombre,
      contraseña: prestamista.contraseña,
    };
  }
}