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
          cliente_idCliente: data.id_cliente,
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
}
