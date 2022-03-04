import { ScheduleValidType, User } from "../interface/entity";

function getDay(offsetFromToday: number): string {
  const curr = new Date();
  const day = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + offsetFromToday, 24);

  return day.toISOString();
}

export const sampleUser: User = {
  name: "sample",
  color: "#ff0000",
  schedules: [
    {
      valid: ScheduleValidType.POSIBLE,
      start: getDay(0),
      end: getDay(0),
      posibleTime: [],
      imposibleTime: [],
    },
    {
      valid: ScheduleValidType.IMPOSIBLE,
      start: getDay(1),
      end: getDay(1),
      posibleTime: [],
      imposibleTime: [],
    },
  ],
};
