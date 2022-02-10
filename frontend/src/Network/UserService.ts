import * as API from './APIType';

export const UserService = {
  createUser: async (calendar_id, user) => {
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
    return response;
  },
  updateUser: async (calendar_id) => {
    const method = 'POST';
    const url = API.url(`${calendar_id}/users`);
    // const body = user;

    let response;
    try {
      response = await API.AXIOS({
        method,
        // data: body,
        url,
      });
    } catch (error) {
      console.log(error);
    }
    return response.data;
  },
};
