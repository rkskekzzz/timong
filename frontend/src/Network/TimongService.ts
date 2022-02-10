import axios from 'axios';
import * as API from './APIType';

export const CalendarService = {
  create: async () => {
    const method = 'POST';
    const url = API.url('');
    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      console.log(error);
    }
    return response.data;
  },

  getCalendar: async (calendar_id) => {
    const method = 'GET';
    const url = API.url(`${calendar_id}`);
    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      console.log(error);
    }
    return response.data;
  },
};
