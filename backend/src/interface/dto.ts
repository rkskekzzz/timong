import { CalendarType, Schedule } from "./entity";

export class CreateCalendarDTO {
  type!: CalendarType;
  name!: string;
  start?: string;
  end?: string;
}

export class UpdateCalendarDTO {
  type?: CalendarType;
  name?: string;
  start?: string;
  end?: string;
}

export class CreateUserDTO {
  name!: string;
  color!: string;
}

export class UpdateUserDTO {
  name?: string;
  color?: string;
}

export class UpdateSchduleDTO {
  schedules!: Schedule[];
}
