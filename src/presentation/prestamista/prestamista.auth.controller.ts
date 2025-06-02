import { Request, Response } from "express";
import { PrismaPrestamistaRepository } from "../../models/prisma/prisma.prestamista.repository";
import { CreatePrestamistaService } from "../services/create-prestamista.service";

export class PrestamistaAuthController {
  private readonly registerService = new CreatePrestamistaService(
    new PrismaPrestamistaRepository(),
  );

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public registerPrestamista = (req: Request, res: Response) => {
    this.registerService
      .execute(req.body)
      .then((prestamista) =>
        res.status(201).json({
          message: "Prestamista registered successfully",
          prestamista: {
            id: prestamista.id,
            correo: prestamista.correo,
          },
        }),
      )
      .catch((error) => this.handleError(error, res));
  };
}
