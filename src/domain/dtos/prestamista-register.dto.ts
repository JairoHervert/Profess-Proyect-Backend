export interface CreatePrestamistaDto {
  correo: string;
  contraseña: string;
  correoVerificado?: boolean;
  nombre?: string;
  telefono?: string;
  tipoEntidad?: string;
  descripcion?: string;
  linkFoto?: string;
}
