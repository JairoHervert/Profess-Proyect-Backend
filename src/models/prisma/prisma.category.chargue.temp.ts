import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaCategoryRepository {
  async loadCategory(): Promise<void> {
    const categorias = [
      'Plomería',
      'Electricidad',
      'Carpintería',
      'Pintura',
      'Reparaciones',
      'Limpieza',
      'Jardinería',
      'Albañilería',
      'Cuidado de niños',
      'Cuidado de adultos mayores',
      'Enfermería',
      'Chofer',
      'Fletes',
      'Mudanzas',
      'Paseo de perros',
      'Cuidado de mascotas',
      'Computación y soporte técnico',
      'Clases particulares',
      'Asesorías',
      'Cocina',
      'Organización de eventos',
      'Costura',
      'Peluquería',
      'Uñas y maquillaje',
      'Masajes',
      'Ayuda en negocios',
      'Instalación de servicios',
      'Decoración',
    ];

    try {
      // Insertar cada categoría en la base de datos
      for (const categoria of categorias) {
        await prisma.categoria.create({
          data: {
            nombreCategoria: categoria,
          },
        });
      }

      console.log('Categorías cargadas con éxito.');
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = await prisma.categoria.findMany({
        select: {
          nombreCategoria: true,
        },
      });
      return categories.map((category) => category.nombreCategoria);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw error;
    }
  }
}
