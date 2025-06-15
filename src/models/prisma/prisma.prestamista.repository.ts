import { PrismaClient } from '@prisma/client';
import { PrestamistaRepository } from '../../domain/repositories/prestamista.repository';
import { CreatePrestamistaDto } from '../../domain/dtos/prestamista-register.dto';
import { PrestamistaEntity } from '../../domain/entities/prestamista.entity';

const prisma = new PrismaClient();

export class PrismaPrestamistaRepository implements PrestamistaRepository {
  async create(data: CreatePrestamistaDto): Promise<PrestamistaEntity> {
    const prestamista = await prisma.prestamista.create({ data });

    return {
      id: prestamista.idPrestamista,
      correo: prestamista.correo,
      telefono: prestamista.telefono ?? undefined,
      tipoEntidad: prestamista.tipoEntidad,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      calificacion: prestamista.calificacion ?? undefined,
      nombre: prestamista.nombre,
      contraseña: prestamista.contraseña,
    };
  }

  async findByCorreo(correo: string): Promise<PrestamistaEntity | null> {
    const prestamista = await prisma.prestamista.findUnique({
      where: { correo },
    });

    if (!prestamista) return null;

    return {
      id: prestamista.idPrestamista,
      correo: prestamista.correo,
      telefono: prestamista.telefono ?? undefined,
      tipoEntidad: prestamista.tipoEntidad,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      calificacion: prestamista.calificacion ?? undefined,
      nombre: prestamista.nombre,
      contraseña: prestamista.contraseña,
    };
  }
}
