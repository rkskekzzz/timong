import { ScheduleValidType, User } from "../interface/entity";

export const sampleUser: User = {
  name: "sample",
  color: "#ff0000",
  schedules: [
    {
      valid: ScheduleValidType.POSIBLE,
      start: Date.now().toString(),
      end: Date.now().toString(),
    },
    {
      valid: ScheduleValidType.IMPOSIBLE,
      start: (Date.now() + 1).toString(),
      end: (Date.now() + 1).toString(),
    },
  ],
};
