import { PrismaClient } from '@prisma/client';
import { SolicitudRepository } from '../../domain/repositories/solicitud.repository';
import { CreateSolicitudDto } from '../../domain/dtos/solicitud-create.dto';
import { SolicitudEntity } from '../../domain/entities/solicitud.entity';

const prisma = new PrismaClient();

export class PrismaSolicitudRepository implements SolicitudRepository {
  // Crear una nueva solicitud de contratación
  async create(data: CreateSolicitudDto): Promise<SolicitudEntity> {
    try {
      // Verificar si ya existe una solicitud con el mismo cliente, servicio y estado distinto a "archivada"
      const existingSolicitud = await prisma.solicitudContratacion.findFirst({
        where: {
          cliente_idCliente: data.id_cliente,
          servicio_idServicio: data.id_servicio,
          estado: {
            not: 'archivadas', // Asegurarse de que el estado no sea "archivada"
          },
        },
      });

      if (existingSolicitud) {
        throw new Error('Ya existe una solicitud activa para este cliente y servicio.');
      }

      const solicitud = await prisma.solicitudContratacion.create({
        data: {
          estado: data.estado || 'pendientes',
          fechaSolicitud: data.fechaSolicitud || new Date(),
          servicio_idServicio: data.id_servicio,
          cliente_idCliente: data.id_cliente
        },
      });

      return {
        id_solicitud: solicitud.idSolicitud,
        id_servicio: solicitud.servicio_idServicio,
        id_cliente: solicitud.cliente_idCliente,
        estado: solicitud.estado,
        fechaSolicitud: solicitud.fechaSolicitud,
      };
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
      throw new Error('No se pudo crear la solicitud.');
    }
  }

  // Eliminar una solicitud de contratación por ID
  async delete(id: number): Promise<void> {
    try {
      await prisma.solicitudContratacion.delete({
        where: { idSolicitud: id },
      });
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error);
      throw new Error('No se pudo eliminar la solicitud.');
    }
  }

  async getByIDClienteOrPrestamista(idUser: number): Promise<SolicitudEntity[]> {
    try {
      const solicitudes = await prisma.solicitudContratacion.findMany({
        where: {
          OR: [
            { cliente_idCliente: idUser },
            { servicio: { prestamista_idPrestamista: idUser } },
          ],
        },
        include: {
          servicio: { // Incluir la información del servicio relacionada
            select: {
              idServicio: true,     // Incluir el ID del servicio
              titulo: true,         // Incluir el nombre o título del servicio
              descripcion: true,    // Incluir la descripción del servicio
              zona: true,          // Incluir la zona o lugar del servicio
              direccion: true,      // Incluir la dirección del servicio
            }
          },
        },
      });

      return solicitudes.map(solicitud => ({
        id_solicitud: solicitud.idSolicitud,
        id_servicio: solicitud.servicio_idServicio,
        id_cliente: solicitud.cliente_idCliente,
        estado: solicitud.estado,
        fechaSolicitud: solicitud.fechaSolicitud,

        nombreServicio: solicitud.servicio.titulo,
        descripcionServicio: solicitud.servicio.descripcion,
        // asignar a ubicacion solo el primer elemento de la zona
        // asumiendo que zona es un array de ubicaciones
        ubicacion: JSON.parse(solicitud.servicio.zona)[0] || '',
        direccion: solicitud.servicio.direccion,
      }));
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      throw new Error('No se pudieron obtener las solicitudes.');
    }
  }

  // Actualizar el estado de una solicitud de contratación
  async updateState(id: number, estado: string): Promise<SolicitudEntity> {
    try {
      const updatedSolicitud = await prisma.solicitudContratacion.update({
        where: { idSolicitud: id },
        data: { estado },
      });

      return {
        id_solicitud: updatedSolicitud.idSolicitud,
        id_servicio: updatedSolicitud.servicio_idServicio,
        id_cliente: updatedSolicitud.cliente_idCliente,
        estado: updatedSolicitud.estado,
        fechaSolicitud: updatedSolicitud.fechaSolicitud,
      };
    } catch (error) {
      console.error('Error al actualizar el estado de la solicitud:', error);
      throw new Error('No se pudo actualizar el estado de la solicitud.');
    }
  }

}