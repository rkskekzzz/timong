import { Request, Response } from "express";
import { TimeService } from "../services";
import { CreateTimeDTO } from "../interface/dto";
import "express-async-errors";

async function create(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  const createTimeDTO: CreateTimeDTO = req.body;
  const calendar = await TimeService.create(
    calendar_id,
    user_id,
    createTimeDTO
  );

  return res.status(200).json(calendar);
}

async function remove(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  const time_id: string = req.params.time_id;
  await TimeService.remove(calendar_id, user_id, time_id);

  return res.sendStatus(200);
}

export const TimeController = {
  create,
  remove,
};
