import { Request, Response } from 'express';
import MessageModel from '../../../mongoose/msgSchema';

export const sendMessage = async (req : Request, res : Response) => {

  // Instanciamos el modelo de usuario, sustituimos la password por la version encriptada
  // y guardamos el usuario en la base de datos
  const message = new MessageModel(req.body);

  await message.save();
  res.status(201).send('Message created successfully');
}