import { User } from '../Interface/UserType';
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
          if (user === action.user) {
            user.schedule = [
              ...user.schedule,
              {
                valid: action.valid,
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
