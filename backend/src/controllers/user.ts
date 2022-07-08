import { Request, Response } from 'express';
import { UserService } from '../services';
import { CreateUserDTO, UpdateUserDto } from '../interface/dto';
import 'express-async-errors';

async function create(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const createUserDTO: CreateUserDTO = req.body;

  const calendar = await UserService.create(calendar_id, createUserDTO);
  const newUser = calendar.users[calendar.users.length - 1];

  return res.status(200).json(newUser);
}

async function update(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const updateuserDto: UpdateUserDto = req.body;

  await UserService.update(calendar_id, updateuserDto);

  return res.sendStatus(200);
}

async function remove(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  await UserService.remove(calendar_id, user_id);

  return res.sendStatus(200);
}

export const UserController = {
  create,
  update,
  remove,
};
