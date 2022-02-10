import axios from 'axios';

export function url(path: string) {
  return `${process.env.REACT_APP_API_URL}/calendar${path}`;
}

export function AXIOS(option) {
  return axios({
    ...option,
  });
}
