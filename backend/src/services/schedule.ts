import { UpdateSchduleDTO } from '../interface/dto';
import ApiError from '../modules/error';
import { Calendar } from '../interface/entity';
import { CalendarService } from './calendar';
import { UserService } from '.';

async function update(
  calendar_id: string,
  user_id: string,
  updateSchduleDTO: UpdateSchduleDTO
): Promise<Calendar> {
  const calendar = await CalendarService.getOneDocument(calendar_id);
  const index = UserService.getIndexOrFail(calendar, user_id);
  const user = calendar.users[index];
  user.schedules = updateSchduleDTO.schedules;

  return calendar.save();
}

export const ScheduleService = {
  update,
};
