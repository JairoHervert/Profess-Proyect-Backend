export class CompleteDataClientDto {
  constructor(
    public readonly id: number,
    public readonly datosCompletos: boolean,
    public readonly nombre?: string,
    public readonly telefono?: string,
    public readonly telefonoSecundario?: string,
    public readonly tipoCuenta?: string,
    public readonly linkFoto?: string,
    public readonly fechaNacimiento?: Date,
    public readonly preferenciasPago?: string,
    public readonly horarios?: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CompleteDataClientDto?] {
    const {
      id,
      datosCompletos,
      nombre,
      telefono,
      telefonoSecundario,
      tipoCuenta,
      linkFoto,
      fechaNacimiento,
      preferenciasPago,
      horarios,
    } = object;

    if (
      !id ||
      !datosCompletos ||
      !nombre ||
      !telefono ||
      !tipoCuenta ||
      !fechaNacimiento ||
      !preferenciasPago ||
      !horarios
    ) {
      return ['Faltan campos obligatorios', undefined];
    }

    const dto = new CompleteDataClientDto(
      id,
      datosCompletos,
      nombre ?? undefined,
      telefono ?? undefined,
      telefonoSecundario ?? undefined,
      tipoCuenta ?? undefined,
      linkFoto ?? undefined,
      fechaNacimiento ?? undefined,
      preferenciasPago ?? undefined,
      horarios ?? undefined
    );

    return [undefined, dto];
  }
}
