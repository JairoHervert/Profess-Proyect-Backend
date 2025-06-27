export interface CreateSolicitudDto {
  correoSolicitante: string;
  correoPrestamista: string;
  nombreSolicitante: string;
  nombrePrestamista: string;
  id_servicio: number;
  id_cliente: number;

  estado: string;
  nombreServicio: string;
  lugar?: string;
  fechaSolicitud?: Date;
}