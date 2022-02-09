import { Request, Response } from "express";
import { UserService } from "../services";
import { CreateUserDTO, UpdateUserDTO } from "../interface/dto";
import "express-async-errors";

async function create(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const createUserDTO: CreateUserDTO = req.body;
  const calendar = await UserService.create(calendar_id, createUserDTO);

  return res.status(200).json(calendar);
}

async function update(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  const updateUserDTO: UpdateUserDTO = req.body;
  const calendar = await UserService.update(
    calendar_id,
    user_id,
    updateUserDTO
  );

  return res.status(200).json(calendar);
}

async function getAll(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const users = await UserService.getAll(calendar_id);

  return res.status(200).json(users);
}
async function remove(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  await UserService.remove(calendar_id, user_id);

  return res.sendStatus(200);
}

export const UserController = {
  create,
  getAll,
  update,
  remove,
};
