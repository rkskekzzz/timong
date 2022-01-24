// 달력 만들기 함수
import moment from 'moment';

export default function makeDate(string: string): moment.Moment {
  return moment(string);
}
