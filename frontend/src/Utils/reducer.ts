import { User } from '../Interface/UserType';
import { State, Action } from 'src/Interface/ContextType';
import moment from 'moment';

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        users: action.users,
      };
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
            const filteredSchedule = user.schedules.filter((sche) => {
              const _sche = moment(sche.start);

              if (_sche.isSame(newSchedule.start, 'day')) {
                flag = sche.valid === newSchedule.valid;
                return false;
              }
              return true;
            });
            if (flag) user.schedules = [...filteredSchedule];
            else user.schedules = [...filteredSchedule, newSchedule];
          }
          return user;
        }),
      };
    default:
      return state;
  }
}
