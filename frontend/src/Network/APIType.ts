import axios from 'axios';

export function url(path: string) {
  console.log(
    'url 함수 안에서 api url 체크',
    `${process.env.REACT_APP_API_URL}`
  );
  return `${process.env.REACT_APP_API_URL}/calendar${path}`;
}

export function AXIOS(option) {
  return axios({
    ...option,
  });
}
