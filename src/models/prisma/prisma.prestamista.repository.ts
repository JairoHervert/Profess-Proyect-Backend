import { PrismaClient } from "@prisma/client";
import { PrestamistaRepository } from "../../domain/repositories/prestamista.repository";
import { CreatePrestamistaDto } from "../../domain/dtos/prestamista-register.dto";
import { PrestamistaEntity } from "../../domain/entities/prestamista.entity";
import { ClientEntity } from "../../domain/entities/client-entity";

const prisma = new PrismaClient();

export class PrismaPrestamistaRepository implements PrestamistaRepository {
  async create(data: CreatePrestamistaDto): Promise<PrestamistaEntity> {
    const prestamista = await prisma.prestamista.create({ data });

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
}
