import { Month, Year, Week, Day } from '../Interface/DateType';
import { User } from '../Interface/UserType';

type State = {
  users: User[];
  calendar: Year;
};
type Action =
  | { type: 'ADD'; user: User }
  | { type: 'DELETE'; index: number; user: User }
  | { type: 'UPDATEDATE'; user: User; day: moment.Moment }
  | { type: 'TEST'; user: User; day: moment.Moment }
  | { type: 'DEFAULT' };

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
          if (user === action.user) {
            user.schedule = [
              ...user.schedule,
              {
                valid: 'POSIBLE',
                start: action.day,
                end: action.day,
              },
            ];
          }
          return user;
        }),
      };
    default:
      return state;
  }
}
