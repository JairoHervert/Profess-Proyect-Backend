export interface CreateClientDto {
  nombre: string;
	correo: string;
	contraseña: string;
  telefono: string;
  tipoEntidad: string;
  linkFoto?: string;
}
