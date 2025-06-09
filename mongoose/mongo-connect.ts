import mongoose from 'mongoose';
import { envs } from '../src/config/envs';

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(envs.ATLAS_URI);
    const uri = `${connection.host}:${connection.port}`;

    console.log(`MongoDB Conectado en: ${uri}`);
  } catch (error) {
    console.log('Error en la conexion a la base de datos');
    console.log(error);
    process.exit(1);
  }
}