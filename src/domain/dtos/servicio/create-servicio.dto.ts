export interface ServicioEntity {
  prestamistaId: number;
  categoriaId: number;
  id: number;
  titulo: string;
  descripcion: string;
  zona: string;
  precio: number;
  fechaInicio: Date;
  cretedAt: Date;
  modalidadCobro: string;
  fechaFin?: Date;
  incluyeMateriales?: boolean;
  ofreceGarantia?: boolean;
  direccionLugar?: string;
  direccionReferencia?: string;
  tipoJornada?: string;
  disponibilidad?: string;
}

export class CreateServicioDto {
  constructor(
    public readonly prestamistaId: number,
    public readonly categoriaId: number,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly zona: string,
    public readonly precio: number,
    public readonly fechaInicio: string,
    // public readonly fechaInicio: Date,
    public readonly modalidadCobro: string,
    public readonly fechaFin?: Date,
    public readonly incluyeMateriales?: boolean,
    public readonly ofreceGarantia?: boolean,
    public readonly direccionLugar?: string,
    public readonly direccionReferencia?: string,
    public readonly tipoJornada?: string,
    public readonly disponibilidad?: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CreateServicioDto?] {
    const {
      prestamistaId,
      categoriaId,
      titulo,
      descripcion,
      zona,
      precio,
      fechaInicio,
      modalidadCobro,
      fechaFin,
      incluyeMateriales,
      ofreceGarantia,
      direccionLugar,
      direccionReferencia,
      tipoJornada,
      disponibilidad,
    } = object;

    if (
      !prestamistaId ||
      !categoriaId ||
      !titulo ||
      !descripcion ||
      !zona ||
      !precio ||
      !fechaInicio ||
      !modalidadCobro
    ) {
      return ["Faltan campos obligatorios", undefined];
    }

    const dto = new CreateServicioDto(
      prestamistaId,
      categoriaId,
      titulo,
      descripcion,
      zona,
      precio,
      fechaInicio,
      // new Date(fechaInicio),
      modalidadCobro,
      fechaFin ? new Date(fechaFin) : undefined,
      incluyeMateriales ?? false,
      ofreceGarantia ?? false,
      direccionLugar ?? undefined,
      direccionReferencia ?? undefined,
      tipoJornada ?? undefined,
      disponibilidad ?? undefined,
    );

    return [undefined, dto];
  }
}
