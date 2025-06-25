export class CreateServicioDto {
  constructor(
    public readonly prestamistaId: number,
    public readonly categoriaId: number,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly direccion: string,
    public readonly garantia: string,
    public readonly zona: string,
    public readonly modalidades: string,
    public readonly fechaInicio: Date,
    public readonly disponibilidad?: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CreateServicioDto?] {
    const {
      prestamistaId,
      categoriaId,
      titulo,
      descripcion,
      direccion,
      garantia,
      zona,
      modalidades,
      fechaInicio,
    } = object;

    if (
      !prestamistaId ||
      !categoriaId ||
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
      categoriaId,
      titulo,
      descripcion,
      direccion,
      garantia,
      zona,
      modalidades,
      new Date(fechaInicio),
      object.disponibilidad ? String(object.disponibilidad) : undefined
    );

    return [undefined, dto];
  }
}
