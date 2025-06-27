export interface SolicitudEntity {
  id_solicitud: number;
  id_servicio: number;
  id_cliente: number;
  estado: string;
  fechaSolicitud?: Date;
}
