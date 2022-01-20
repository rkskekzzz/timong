import { User, Schedule } from '../Interface/UserType';
import { State, Action } from 'src/Interface/ContextType';

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { ...state, users: state.users.concat(action.user) };
    case 'DELETE':
      return {
        ...state,
        users: state.users.filter((_, index) => {
          return index !== action.index;
        }),
      };
    case 'UPDATEDATE':
      return {
        ...state,
        users: state.users.map((user: User): User => {
          const newSchedule = {
            valid: action.valid,
            start: action.day,
            end: action.day,
          };
          let flag: boolean;
          if (user === action.user) {
            const filteredSchedule = user.schedule.filter((sche) => {
              if (sche.start.isSame(newSchedule.start, 'day')) {
                flag = sche.valid === newSchedule.valid;
                return false;
              }
              return true;
            });
            if (flag) user.schedule = [...filteredSchedule];
            else user.schedule = [...filteredSchedule, newSchedule];
          }
          return user;
        }),
      };
    default:
      return state;
  }
}
