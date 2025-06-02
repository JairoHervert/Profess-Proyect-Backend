export interface PrestamistaEntity {
  id: number;
  correo: string;
  telefono: string;
  tipoEntidad: string;
  descripcion?: string;
  linkFoto?: string;
  calificacion?: number;
  nombre: string;
  contraseña: string;
}
