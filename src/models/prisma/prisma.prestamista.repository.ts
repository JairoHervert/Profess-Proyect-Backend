import { PrismaClient } from '@prisma/client';
import { PrestamistaRepository } from '../../domain/repositories/prestamista.repository';
import { CreatePrestamistaDto } from '../../domain/dtos/prestamista-register.dto';
import { PrestamistaEntity } from '../../domain/entities/prestamista.entity';
import { CompleteDataDto } from '../../domain/dtos/prestamista/prestamista-completeData.dto';

const prisma = new PrismaClient();

export class PrismaPrestamistaRepository implements PrestamistaRepository {
  async create(data: CreatePrestamistaDto): Promise<PrestamistaEntity> {
    const prestamista = await prisma.prestamista.create({ data });

    return {
      id: prestamista.idPrestamista,
      correo: prestamista.correo,
      contraseña: prestamista.contraseña,
      correoVerificado: prestamista.correoVerificado,
      datosCompletos: prestamista.datosCompletos,
      telefono: prestamista.telefono ?? undefined,
      tipoEntidad: prestamista.tipoEntidad ?? undefined,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      calificacion: prestamista.calificacion ?? undefined,
      nombre: prestamista.nombre ?? undefined,
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
      contraseña: prestamista.contraseña,
      correoVerificado: prestamista.correoVerificado,
      datosCompletos: prestamista.datosCompletos,
      telefono: prestamista.telefono ?? undefined,
      tipoEntidad: prestamista.tipoEntidad ?? undefined,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      calificacion: prestamista.calificacion ?? undefined,
      nombre: prestamista.nombre ?? undefined,
    };
  }

  async getNombreById(id: number): Promise<string | null> {
    const prestamista = await prisma.prestamista.findUnique({
      where: { idPrestamista: id },
      select: { nombre: true },
    });

    return prestamista?.nombre ?? null;
  }

  async completeData(
    idPrestamista: number,
    data: CompleteDataDto
  ): Promise<PrestamistaEntity | null> {
    const prestamista = await prisma.prestamista.update({
      where: { idPrestamista },
      data: {
        datosCompletos: data.datosCompletos,
        nombre: data.nombre,
        telefono: data.telefono,
        telefonoSecundario: data.telefonoSecundario,
        tipoEntidad: data.tipoEntidad,
        descripcion: data.descripcion,
        linkFoto: data.linkFoto,
        fechaNacimiento: data.fechaNacimiento,
        preferenciasPago: data.preferenciasPago,
        horarios: data.horarios,
        redesSociales: data.redesSociales,
      },
    });

    return {
      id: prestamista.idPrestamista,
      correo: prestamista.correo,
      contraseña: prestamista.contraseña,
      correoVerificado: prestamista.correoVerificado,
      datosCompletos: prestamista.datosCompletos,
      nombre: prestamista.nombre ?? undefined,
      telefono: prestamista.telefono ?? undefined,
      telefonoSecundario: prestamista.telefonoSecundario ?? undefined,
      tipoEntidad: prestamista.tipoEntidad ?? undefined,
      descripcion: prestamista.descripcion ?? undefined,
      linkFoto: prestamista.linkFoto ?? undefined,
      fechaNacimiento: prestamista.fechaNacimiento ?? undefined,
      preferenciasPago: prestamista.preferenciasPago ?? undefined,
      horarios: prestamista.horarios ?? undefined,
      redesSociales: prestamista.redesSociales ?? undefined,
    };
  }
}
