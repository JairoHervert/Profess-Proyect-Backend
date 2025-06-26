export interface ClientEntity {
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
  tipoCuenta?: string;
  preferenciasPago?: string;
  horarios?: string;
}
