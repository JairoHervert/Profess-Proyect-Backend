import { Request, Response } from 'express';
import { PrismaSolicitudRepository } from '../../models/prisma/prisma.solicitud.repository';
import { CreateSolicitudService } from '../services/solicitud/create-solicitud.service';
import { CreateSolicitudDto } from '../../domain/dtos/solicitud-create.dto';
import { DeleteSolicitudService } from '../services/solicitud/delete-solicitud.service';
import { GetByIDUserOrPrestamistaService } from '../services/solicitud/getById-solicitud.service';
import { UpdateEstadoSolicitudService } from '../services/solicitud/update-estado.service';

export class SolicitudController {
  private readonly createService = new CreateSolicitudService(
    new PrismaSolicitudRepository()
  );
  private readonly getByIdService = new GetByIDUserOrPrestamistaService(
    new PrismaSolicitudRepository()
  );
  private readonly updateService = new UpdateEstadoSolicitudService(
    new PrismaSolicitudRepository()
  );

  private handleError = (error: unknown, res: Response) => {
    console.error('Error in SolicitudController:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  public createSolicitud = async (req: Request, res: Response): Promise<void> => {
    const {
      correoSolicitante,
      correoPrestamista,
      nombreSolicitante,
      nombrePrestamista,
      id_servicio,
      id_cliente,
      estado,
      nombreServicio,
      lugar,
      fechaSolicitud,
    }: CreateSolicitudDto = req.body;

    // Valida si la información necesaria está presente
    if (!id_servicio || !id_cliente) {
      res.status(400).json({ error: 'El servicio y el cliente son obligatorios' });
      return;
    }

    try {
      const solicitud = await this.createService.execute({
        correoSolicitante,
        correoPrestamista,
        nombreSolicitante,
        nombrePrestamista,
        id_servicio,
        id_cliente,
        estado,
        nombreServicio,
        lugar,
        fechaSolicitud,
      });
      res.status(201).json(solicitud);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public deleteSolicitud = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // Valida que el ID de la solicitud sea un número
    const solicitudId = parseInt(id, 10);
    if (isNaN(solicitudId)) {
      res.status(400).json({ error: 'El ID de la solicitud debe ser un número válido' });
      return;
    }

    try {
      await new DeleteSolicitudService(new PrismaSolicitudRepository()).execute(solicitudId);
      res.status(204).send();
      console.log(`Solicitud con ID ${solicitudId} eliminada correctamente.`);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  // Método para obtener las solicitudes por cliente o prestamista
  public getSolicitudesByUser = async (req: Request, res: Response): Promise<void> => {
    const { idUser } = req.params; // idUser debería ser un parámetro en la URL

    if (!idUser) {
      res.status(400).json({ error: 'El ID de usuario es obligatorio' });
      return;
    }

    try {
      const solicitudes = await this.getByIdService.execute(parseInt(idUser, 10));
      res.status(200).json(solicitudes); // Responder con las solicitudes
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public updateSolicitudState = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { estado } = req.params;

    // Validar que el ID de la solicitud y el estado sean válidos
    if (!id || !estado) {
      res.status(400).json({ error: 'El ID de la solicitud y el estado son obligatorios' });
      return;
    }

    try {
      const updatedSolicitud = await this.updateService.execute(parseInt(id, 10), estado);
      res.status(200).json(updatedSolicitud);
    } catch (error) {
      this.handleError(error, res);
    }
  };

}
