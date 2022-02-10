import axios from 'axios';

export function url(path: string) {
  return `http://localhost:5500/calendar${path}`;
  // return `https://42world.kr/api/${version}/${path}`;
}

export function AXIOS(option) {
  return axios({
    ...option,
  });
}
