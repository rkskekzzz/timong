import { Request, Response } from "express";
import { CalendarService, UserService } from "../services";
import { CreateCalendarDTO } from "../interface/dto";
import { sampleUser } from "../db/sample";
import "express-async-errors";
import { User } from "../interface/entity";

async function create(req: Request, res: Response): Promise<Response> {
  const createCalendarDTO: CreateCalendarDTO = req.body;
  const calendar = await CalendarService.create(createCalendarDTO);

  if (calendar && calendar._id) {
    const user: User = await UserService.create(calendar._id, sampleUser);
    calendar.users = [...calendar.users, user];
  }

  return res.status(200).json(calendar);
}

async function getOne(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const calendar = await CalendarService.getOne(calendar_id);

  return res.status(200).json(calendar);
}

export const CalendarController = {
  create,
  getOne,
};
