import axios from 'axios';
import * as API from './APIType';

export const CalendarService = {
  create: async (calendarName) => {
    const method = 'POST';
    const url = API.url('');
    const body = { name: calendarName };
    let response;
    try {
      response = await axios({
        method,
        data: body,
        url,
      });
    } catch (error) {
      console.log(error);
    }
    return response.data;
  },

  getCalendar: async (calendarId) => {
    const method = 'GET';
    const url = API.url(`${calendarId}`);
    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    return response.data;
  },
};
