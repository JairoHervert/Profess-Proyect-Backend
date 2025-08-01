export interface ServicioEntity {
  prestamistaId: number;
  categoriaId: number;
  id: number;
  titulo: string;
  descripcion: string;
  materiales: boolean;
  direccion: string;
  garantia: string;
  zona: string;
  modalidades: string;
  createdAt: Date;
  fechaInicio: Date;
  imagenes: string;
  disponibilidad?: string;
}
