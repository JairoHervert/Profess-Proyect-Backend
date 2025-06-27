export class CreateServicioDto {
  constructor(
    public readonly prestamistaId: number,
    public readonly categoria: string,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly materiales: boolean,
    public readonly direccion: string,
    public readonly garantia: string,
    public readonly zona: string,
    public readonly modalidades: string,
    public readonly fechaInicio: Date,
    public readonly imagenes: string,
    public readonly disponibilidad?: string,
    public idCategoria?: number
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CreateServicioDto?] {
    const {
      prestamistaId,
      categoria,
      titulo,
      descripcion,
      materiales,
      direccion,
      garantia,
      zona,
      modalidades,
      fechaInicio,
      imagenes,
    } = object;

    if (
      !prestamistaId ||
      !categoria ||
      !titulo ||
      !descripcion ||
      !direccion ||
      !garantia ||
      !zona ||
      !modalidades ||
      !fechaInicio
    ) {
      return ['Faltan campos obligatorios', undefined];
    }

    const dto = new CreateServicioDto(
      prestamistaId,
      categoria,
      titulo,
      descripcion,
      materiales,
      direccion,
      garantia,
      zona,
      modalidades,
      new Date(fechaInicio),
      imagenes,
      object.disponibilidad ? String(object.disponibilidad) : undefined
    );

    return [undefined, dto];
  }
}
