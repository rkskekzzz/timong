import { Request, Response } from "express";
import { CalendarService } from "../services";
import { CreateCalendarDTO, UpdateCalendarDTO } from "../interface/dto";
import "express-async-errors";

async function create(req: Request, res: Response): Promise<Response> {
  const createCalendarDTO: CreateCalendarDTO = req.body;
  const calendar = await CalendarService.create(createCalendarDTO);

  return res.status(200).json(calendar);
}

async function getOne(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const calendar = await CalendarService.getOne(calendar_id);

  return res.status(200).json(calendar);
}

async function update(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const updateCalendarDTO: UpdateCalendarDTO = req.body;
  const calendar = await CalendarService.update(calendar_id, updateCalendarDTO);
  return res.status(200).json(calendar);
}

export const CalendarController = {
  create,
  getOne,
  update,
};
