import { Request, Response } from 'express';
import { CalendarService, UserService } from '../services';
import { CreateCalendarDTO } from '../interface/dto';
import { sampleUser } from '../db/sample';
import 'express-async-errors';

async function create(req: Request, res: Response): Promise<Response> {
  const createCalendarDTO: CreateCalendarDTO = req.body;
  let calendar = await CalendarService.create(createCalendarDTO);

  // if (calendar && calendar._id) {
  //   calendar = await UserService.create(calendar._id!, sampleUser);
  // }

  return res.status(200).json(calendar);
}

async function getOne(req: Request, res: Response): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const calendar = await CalendarService.getOne(calendar_id);

  return res.status(200).json(calendar);
}

async function updateMeetingDays(
  req: Request,
  res: Response
): Promise<Response> {
  const calendar_id: string = req.params.calendar_id;
  const meetingDay: string = req.body;
  const calendar = await CalendarService.updateMeetingDays(
    calendar_id,
    meetingDay
  );

  return res.status(200).json(calendar);
}

export const CalendarController = {
  create,
  getOne,
  updateMeetingDays,
};
