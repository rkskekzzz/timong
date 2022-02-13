import { Request, Response } from "express";
import { ScheduleService } from "../services";
import { UpdateSchduleDTO } from "../interface/dto";
import "express-async-errors";

async function update(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const user_id: string = req.params.user_id;
  const updateSchduleDTO: UpdateSchduleDTO = req.body;

  await ScheduleService.update(calendar_id, user_id, updateSchduleDTO);

  return res.sendStatus(200);
}

export const ScheduleController = {
  update,
};
