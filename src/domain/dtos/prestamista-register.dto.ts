export interface CreatePrestamistaDto {
  correo: string;
  contraseña: string;
  nombre?: string;
  telefono?: string;
  tipoEntidad?: string;
  descripcion?: string;
  linkFoto?: string;
}
