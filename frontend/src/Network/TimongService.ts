import axios from 'axios';
import * as API from './APIType';

export const CalendarService = {
  create: async () => {
    let response;
    try {
      response = await axios.post(API.url(''));
    } catch (error) {
      console.log(error);
    }
    return response;
  },

  getCalendar: async () => {
    let response;
    try {
      response = await axios.get(API.url(''));
    } catch (error) {
      console.log(error);
    }
    return false;
    // return response;
  },
};
