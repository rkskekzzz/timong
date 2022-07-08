import { CreateUserDTO, UpdateUserDto } from '../interface/dto';
import ApiError from '../modules/error';
import { Calendar } from '../interface/entity';
import { Document } from 'mongoose';
import { CalendarService } from './calendar';

async function create(
  calendar_id: string,
  createUserDTO: CreateUserDTO
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  calendar.users.forEach((user) => {
    if (user.name === createUserDTO.name) {
      throw new ApiError(400, `User ${createUserDTO.name} already exists`);
    }
  });
  calendar.users.push(createUserDTO);

  return calendar.save();
}

async function update(
  calendar_id: string,
  updateUserDto: UpdateUserDto
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);

  const newUsers = calendar.users.map((user) => {
    if (user._id?.toString() === updateUserDto._id) {
      user.name = updateUserDto.name;
      user.color = updateUserDto.color;
    }
    return user;
  });

  calendar.users = [...newUsers];

  return calendar.save();
}

function findIndexOrFail(
  calendar: Calendar & Document,
  user_id: string
): number {
  const index = calendar.users.findIndex((user) => {
    const parseId = JSON.stringify(user._id).replace(/"/g, '');
    return parseId === user_id;
  });
  if (index === -1) {
    throw new ApiError(404, `User ${user_id} not found`);
  }
  return index;
}

async function remove(calendar_id: string, user_id: string): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const user_index = findIndexOrFail(calendar, user_id);

  calendar.users = calendar.users.filter((_, index) => index !== user_index);

  return calendar.save();
}

export const UserService = {
  create,
  update,
  findIndexOrFail,
  remove,
};
