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
          let schedules = [];
          if (user._id === action.user._id) {
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
            if (flag) {
              schedules = [...filteredSchedule];
            } else {
              schedules = [...filteredSchedule, newSchedule];
            }
          } else {
            schedules = [...user.schedules];
          }
          // console.log(schedules);
          return { ...user, schedules: [...schedules] };
        }),
      };
    case 'ANONY_UPDATETIMETABLE':
      return {
        ...state,
        users: state.users.map((user: User): User => {
          if (user._id === action.user._id) {
            const updatedSchedules = user.schedules.map(
              (schedule: Schedule) => {
                const _sche = moment(schedule.start);
                if (_sche.isSame(action.date.moment)) {
                  const { time } = action;

                  // Check if the time already exists in the posibleTime array
                  const index = schedule.posibleTime.indexOf(time);

                  if (index === -1) {
                    // Add the time to the posibleTime array
                    return {
                      ...schedule,
                      posibleTime: [...schedule.posibleTime, time],
                    };
                  } else {
                    // Remove the time from the posibleTime array
                    return {
                      ...schedule,
                      posibleTime: schedule.posibleTime.filter(
                        (t: number) => t !== time
                      ),
                    };
                  }
                } else {
                  return schedule;
                }
              }
            );

            return {
              ...user,
              schedules: [...updatedSchedules],
            };
          } else {
            return user;
          }
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
