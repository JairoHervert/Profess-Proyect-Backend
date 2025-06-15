export interface ServicioEntity {
  prestamistaId: number;
  categoriaId: number;
  id: number;
  titulo: string;
  descripcion: string;
  zona: string;
  precio: number;
  fechaInicio: string;
  // fechaInicio: Date;
  createdAt: Date;
  modalidadCobro: string;
  fechaFin?: Date;
  incluyeMateriales?: boolean;
  ofreceGarantia?: boolean;
  direccionLugar?: string;
  direccionReferencia?: string;
  tipoJornada?: string;
  disponibilidad?: string;
}
