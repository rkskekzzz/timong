import { CreateUserDTO, UpdateUserDTO } from "../interface/dto";
import ApiError from "../modules/error";
import { Calendar, User } from "../interface/entity";
import { Document } from "mongoose";
import { CalendarService } from "./calendar";

async function create(
  calendar_id: string,
  createUserDTO: CreateUserDTO
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const user: User = {
    schedules: [],
    ...createUserDTO,
  };

  calendar.users.push(user);
  return calendar.save();
}

async function getAll(calendar_id: string): Promise<User[]> {
  return await CalendarService.getOne(calendar_id).then(
    (calendar) => calendar.users
  );
}

function getIndexOrFail(
  calendar: Calendar & Document,
  user_id: string
): number {
  const index = calendar.users.findIndex((user) => {
    const parseId = JSON.stringify(user._id).replace(/"/g, "");
    return parseId === user_id;
  });
  if (index === -1) {
    throw new ApiError(404, `User ${user_id} not found`);
  }
  return index;
}

async function update(
  calendar_id: string,
  user_id: string,
  updateUserDTO: UpdateUserDTO
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const index = getIndexOrFail(calendar, user_id);
  const user = calendar.users[index];
  calendar.users[index] = {
    ...user,
    ...updateUserDTO,
  };

  return calendar.save();
}

async function remove(calendar_id: string, user_id: string): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const user_index = getIndexOrFail(calendar, user_id);
  calendar.users.filter((_, index) => index !== user_index);

  return calendar.save();
}

export const UserService = {
  create,
  getAll,
  getIndexOrFail,
  update,
  remove,
};
