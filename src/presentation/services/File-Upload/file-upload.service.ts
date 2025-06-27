import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../../config/uuid.adapter';

// Simular __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'gif', 'jpg', 'jpeg', 'pdf']
  ) {
    const fileExtension = file.mimetype.split('/').at(1) ?? '';
    if (!validExtensions.includes(fileExtension)) {
      throw new Error(
        `Invalid file type: ${fileExtension}. Valid types are: ${validExtensions.join(', ')}`
      );
    }

    const destination = path.resolve(__dirname, '../../../../', folder);
    this.checkFolder(destination);

    const originalFileName = file.name;
    const fileName = `${this.uuid()}.${fileExtension}`;
    const finalPath = `${destination}/${fileName}`;

    // Guardar el archivo
    await file.mv(finalPath);

    // return { fileName };
    // regresar el nombre del archivo y el link con localhost3000
    return {
      fileName: originalFileName,
      link: `http://localhost:3000/${folder}/${fileName}`,
    };
  }
}
