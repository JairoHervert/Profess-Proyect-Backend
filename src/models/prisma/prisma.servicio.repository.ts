import { PrismaClient } from '@prisma/client';
import { ServicioRepository } from '../../domain/repositories/servicio.repository';
import { CreateServicioDto } from '../../domain/dtos/servicio/create-servicio.dto';
import { ServicioEntity } from '../../domain/entities/servicio.entity';

const prisma = new PrismaClient();

export class PrismaServicioRepository implements ServicioRepository {
  async create(CreateServicioDto: CreateServicioDto): Promise<ServicioEntity> {
    const servicio = await prisma.servicio.create({
      data: {
        titulo: CreateServicioDto.titulo,
        descripcion: CreateServicioDto.descripcion,
        materiales: CreateServicioDto.materiales,
        direccion: CreateServicioDto.direccion,
        garantia: CreateServicioDto.garantia,
        zona: CreateServicioDto.zona,
        modalidades: CreateServicioDto.modalidades,
        fechaInicio: CreateServicioDto.fechaInicio,
        imagenes: CreateServicioDto.imagenes,
        disponibilidad: CreateServicioDto.disponibilidad,
        prestamista_idPrestamista: CreateServicioDto.prestamistaId,
        categoria_idCategoria: CreateServicioDto.idCategoria ?? 5,
      },
    });
    // Convertir el resultado a ServicioEntity si es necesario
    const servicioEntity: ServicioEntity = {
      id: servicio.idServicio,
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      materiales: servicio.materiales,
      direccion: servicio.direccion,
      garantia: servicio.garantia,
      zona: servicio.zona,
      modalidades: servicio.modalidades,
      createdAt: servicio.createdAt,
      fechaInicio: servicio.fechaInicio,
      imagenes: servicio.imagenes,
      disponibilidad: servicio.disponibilidad || undefined,
      prestamistaId: servicio.prestamista_idPrestamista,
      categoriaId: servicio.categoria_idCategoria,
    };
    return servicioEntity;
  }

  async searchServices(trabajo: string, zona: string): Promise<ServicioEntity[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const condiciones: any = {};

    if (trabajo.trim()) {
      condiciones.OR = [
        {
          titulo: {
            contains: trabajo,
          },
        },
        {
          categoria: {
            is: {
              nombreCategoria: {
                contains: trabajo,
              },
            },
          },
        },
      ];
    }

    if (zona.trim()) {
      condiciones.AND = [
        {
          OR: [
            {
              direccion: {
                contains: zona,
              },
            },
            {
              zona: {
                contains: zona,
              },
            },
          ],
        },
      ];
    }

    const servicios = await prisma.servicio.findMany({
      where: condiciones,
      include: {
        categoria: true,
        prestamista: true,
      },
    });

    return servicios.map(servicio => ({
      id: servicio.idServicio,
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      materiales: servicio.materiales,
      direccion: servicio.direccion,
      garantia: servicio.garantia,
      zona: servicio.zona,
      modalidades: servicio.modalidades,
      createdAt: servicio.createdAt,
      fechaInicio: servicio.fechaInicio,
      imagenes: servicio.imagenes,
      disponibilidad: servicio.disponibilidad || undefined,
      prestamistaId: servicio.prestamista_idPrestamista,
      categoriaId: servicio.categoria_idCategoria,
    }));
  }
}
