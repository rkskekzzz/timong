import { User } from 'src/Interface/UserType';
import * as API from './APIType';

export const UserService = {
  createUser: async (calendar_id, user): Promise<User> => {
    const method = 'POST';
    const url = API.url(`${calendar_id}/users`);
    const body = user;

    let response;
    try {
      response = await API.AXIOS({
        method,
        data: body,
        url,
      });
    } catch (error) {
      console.log(error);
    }

    return response.data;
  },
  deleteUser: async (calendar_id, user_id) => {
    const method = 'DELETE';
    const url = API.url(`${calendar_id}/users/${user_id}`);

    let response;
    try {
      response = await API.AXIOS({
        method,
        url,
      });
    } catch (error) {
      console.log(error);
    }
    return response.data;
  },
};
