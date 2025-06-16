export interface PrestamistaEntity {
  id: number;
  correo: string;
  contraseña: string;
  correoVerificado: boolean;
  datosCompletos: boolean;
  nombre?: string;
  telefono?: string;
  tipoEntidad?: string;
  descripcion?: string;
  linkFoto?: string;
  calificacion?: number;
}
