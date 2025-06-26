import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from '../config/mongoose/mongo-connect';

// Pruebas
import { AuthMiddleware } from './middleware/prestamista.auth.middleware.cookies';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    // this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* MongoDB Connection
    await connectMongoDB();

    //* Routes
    this.app.use(this.routes);

    this.app.get(
      '/check-token',
      [AuthMiddleware.validateRole('prestamista')],
      (req: Request, res: Response) => {
        const token = req.cookies?.token;
        // const payload = (req as any).auth;
        // console.log('Payload recibido:', payload);
        if (token) {
          return res.json({ message: 'Token recibido', token });
        } else {
          return res.status(401).json({ error: 'No se encontró el token' });
        }
      }
    );

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
