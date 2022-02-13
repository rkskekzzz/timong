import { CreateCalendarDTO } from "../interface/dto";
import CalendarModel from "../db/model";
import ApiError from "../modules/error";
import { Calendar } from "../interface/entity";
import { Document } from "mongoose";

async function create(createCalendarDTO: CreateCalendarDTO): Promise<Calendar> {
  return CalendarModel.create(createCalendarDTO);
}

async function getOneDocument(
  calendar_id: string
): Promise<Calendar & Document> {
  const calendar = await CalendarModel.findById(calendar_id);
  if (!calendar) {
    throw new ApiError(404, `Calendar ${calendar_id} not found`);
  }
  return calendar;
}

async function getOne(calendar_id: string): Promise<Calendar> {
  return getOneDocument(calendar_id);
}

export const CalendarService = {
  create,
  getOne,
  getOneDocument,
};
