import * as API from './APIType';
// /:calendar_id/users/:user_id/schedule
export const ScheduleService = {
  updateSchedules: async (calendar_id, user) => {
    const method = 'POST';
    const { _id, schedules } = user;
    const url = API.url(`${calendar_id}/users/${_id}/schedule`);
    const body = { schedules: schedules };

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
};
