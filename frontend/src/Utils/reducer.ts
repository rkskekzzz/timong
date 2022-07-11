import { Schedule, User } from '../Interface/UserType';
import { State, Action } from 'src/Interface/ContextType';
import { Day } from 'src/Interface/DateType';
import moment from 'moment';

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        users: action.users,
        meetingDays: action.meetingDays,
      };
    case 'SIGNIN':
      return {
        ...state,
        isSigned: action.uid,
      };
    case 'CHANGEMODE':
      return {
        ...state,
        mode: action.mode,
      };
    case 'SIGNED_SET_USER':
      return {
        ...state,
        calendarList: { ...state.calendarList, ...action.calendar },
      };
    case 'SIGNED_SET_CALENDARLIST':
      return {
        ...state,
        calendarList: [...action.calendarList],
      };
    case 'ANONY_ADD':
      return { ...state, users: state.users.concat(action.user) };
    case 'ANONY_DELETE':
      return {
        ...state,
        users: state.users.filter((_, index) => {
          return index !== action.index;
        }),
      };
    case 'ANONY_UPDATEDATE':
      return {
        ...state,
        users: state.users.map((user: User): User => {
          const newSchedule = {
            valid: action.valid,
            start: action.day,
            end: action.day,
            posibleTime: [],
            imposibleTime: [],
          };
          let flag: boolean;
          if (user === action.user) {
            const filteredSchedule = user.schedules.filter(
              (schedule: Schedule) => {
                const _sche = moment(schedule.start);

                if (_sche.isSame(newSchedule.start, 'day')) {
                  flag = schedule.valid === newSchedule.valid;
                  return false;
                }
                return true;
              }
            );
            if (flag) user.schedules = [...filteredSchedule];
            else user.schedules = [...filteredSchedule, newSchedule];
          }
          return user;
        }),
      };
    case 'ANONY_UPDATETIMETABLE':
      return {
        ...state,
        users: state.users.map((user: User): User => {
          if (user === action.user) {
            for (const [index, schedule] of user.schedules.entries()) {
              const _sche = moment(schedule.start);
              if (_sche.isSame(action.date.moment)) {
                const filteredPosibleTime = schedule.posibleTime.filter(
                  (time: number) => {
                    if (action.time === time) {
                      return false;
                    } else return true;
                  }
                );
                if (
                  filteredPosibleTime.length ===
                  user.schedules[index].posibleTime.length
                )
                  user.schedules[index].posibleTime = [
                    ...filteredPosibleTime,
                    action.time,
                  ];
                else
                  user.schedules[index].posibleTime = [...filteredPosibleTime];
              }
            }
          }
          return user;
        }),
      };

    case 'SETSELECTEDVALID':
      return {
        ...state,
        selectedValid: action.selectedValid,
      };
    case 'SETSELECTEDDATE':
      return {
        ...state,
        selectedDate: action.day ? new Day(action.day) : null,
      };
    case 'SETSELECTEDUSER':
      return {
        ...state,
        selectedUser: action.user,
      };
    default:
      return state;
  }
}
