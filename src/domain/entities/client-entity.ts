export interface ClientEntity {
  id: number;
  nombre: string;
	correo: string;
	contraseña: string;
  telefono: string;
  tipoEntidad: string;
  linkFoto?: string;
  calificacion?: number;
}