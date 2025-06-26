export interface PrestamistaEntity {
  id: number;
  correo: string;
  contraseña: string;
  correoVerificado: boolean;
  datosCompletos: boolean;
  nombre?: string;
  telefono?: string;
  telefonoSecundario?: string;
  tipoEntidad?: string;
  descripcion?: string;
  linkFoto?: string;
  calificacion?: number;
  fechaNacimiento?: Date;
  preferenciasPago?: string;
  horarios?: string;
  redesSociales?: string;
  tipoCuenta?: string;
  experiencia?: string;
}
