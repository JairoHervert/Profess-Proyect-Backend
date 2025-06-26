export class CompleteDataDto {
  constructor(
    public readonly id: number,
    public readonly datosCompletos: boolean,
    public readonly nombre?: string,
    public readonly telefono?: string,
    public readonly telefonoSecundario?: string,
    public readonly tipoCuenta?: string,
    public readonly descripcion?: string,
    public readonly linkFoto?: string,
    public readonly fechaNacimiento?: Date,
    public readonly preferenciasPago?: string,
    public readonly horarios?: string,
    public readonly redesSociales?: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CompleteDataDto?] {
    const {
      id,
      datosCompletos,
      nombre,
      telefono,
      telefonoSecundario,
      tipoCuenta,
      descripcion,
      linkFoto,
      fechaNacimiento,
      preferenciasPago,
      horarios,
      redesSociales,
    } = object;

    if (
      !id ||
      !datosCompletos ||
      !nombre ||
      !telefono ||
      !descripcion ||
      !linkFoto ||
      !tipoCuenta ||
      !fechaNacimiento ||
      !preferenciasPago ||
      !horarios
    ) {
      return ['Faltan campos obligatorios', undefined];
    }

    const dto = new CompleteDataDto(
      id,
      datosCompletos,
      nombre ?? undefined,
      telefono ?? undefined,
      telefonoSecundario ?? undefined,
      tipoCuenta ?? undefined,
      descripcion ?? undefined,
      linkFoto ?? undefined,
      fechaNacimiento ?? undefined,
      preferenciasPago ?? undefined,
      horarios ?? undefined,
      redesSociales ?? undefined
    );

    return [undefined, dto];
  }
}
