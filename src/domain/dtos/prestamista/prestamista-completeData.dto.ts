export class CompleteDataDto {
  constructor(
    public readonly id: number,
    public readonly datosCompletos: boolean,
    public readonly nombre?: string,
    public readonly telefono?: string,
    public readonly descripcion?: string,
    public readonly linkFoto?: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, CompleteDataDto?] {
    const { id, datosCompletos, nombre, telefono, descripcion, linkFoto } = object;

    if (!id || !datosCompletos || !nombre || !telefono || !descripcion || !linkFoto) {
      return ['Faltan campos obligatorios', undefined];
    }

    const dto = new CompleteDataDto(
      id,
      datosCompletos,
      nombre ?? undefined,
      telefono ?? undefined,
      descripcion ?? undefined,
      linkFoto ?? undefined
    );

    return [undefined, dto];
  }
}
