// 달력 만들기 함수
import moment from 'moment';

export default function makeDate(
  year: number,
  month: number,
  day: number
): moment.Moment {
  return moment(`${year}-${month}-${day}`);
}
