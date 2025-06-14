import express, { Router } from 'express';
import cors from 'cors';
import { connectMongoDB } from '../config/mongoose/mongo-connect';

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
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );
    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* MongoDB Connection
    await connectMongoDB();

    //* Routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
