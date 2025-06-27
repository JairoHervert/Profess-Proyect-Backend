export class SearchServicioDto {
  constructor(
    public readonly trabajo: string,
    public readonly zona: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(object: { [key: string]: any }): [string?, SearchServicioDto?] {
    const { trabajo, zona } = object;

    const dto = new SearchServicioDto(trabajo, zona);

    return [undefined, dto];
  }
}
