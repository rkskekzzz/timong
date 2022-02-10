import { CreateTimeDTO } from '../interface/dto';
import CalendarModel from '../db/model';
import ApiError from '../modules/error';
import { Calendar, TimeRange } from '../interface/entity';
import { Model } from 'mongoose';
import { Document } from 'mongoose';
import { CalendarService } from './calendar';
import { UserService } from '.';

async function create(
  calendar_id: string,
  user_id: string,
  createTimeDTO: CreateTimeDTO
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const index = UserService.getIndexOrFail(calendar, user_id);
  calendar.users[index].schedule.push(createTimeDTO);

  return calendar.save();
}

async function remove(
  calendar_id: string,
  user_id: string,
  time_id: string
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const index = UserService.getIndexOrFail(calendar, user_id);
  calendar.users[index].schedule.filter((time) => time._id !== time_id);

  return calendar.save();
}

export const TimeService = {
  create,
  remove,
};
