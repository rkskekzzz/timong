import { CalendarType } from "./entity";

export class CreateCalendarDTO {
  type!: CalendarType;
  start?: string;
  end?: string;
}

export class UpdateCalendarDTO {
  type?: CalendarType;
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

export class CreateTimeDTO {
  start!: string;
  end!: string;
}
