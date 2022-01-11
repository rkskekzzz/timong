import { CalendarType } from '../entities/calendar.entity';

export class CreateCalendarDto {
  readonly type!: CalendarType;
  readonly start?: string;
  readonly end?: string;
}
