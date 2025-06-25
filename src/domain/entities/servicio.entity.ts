export interface ServicioEntity {
  prestamistaId: number;
  categoriaId: number;
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  garantia: string;
  zona: string;
  modalidades: string;
  createdAt: Date;
  fechaInicio: Date;
  disponibilidad?: string;
}
