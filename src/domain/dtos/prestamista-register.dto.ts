export interface CreatePrestamistaDto {
  correo: string;
  telefono?: string;
  contraseña: string;
  tipoEntidad: string;
  descripcion?: string;
  linkFoto?: string;
  nombre: string;
}
