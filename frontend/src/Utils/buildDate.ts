import { Day, Week, Month, Year } from '../Interface/DateType';

const buildWeek = (monthMoment: moment.Moment, week: number): Week => {
  return Array(7)
    .fill(0)
    .map((_, index) => {
      const day = monthMoment
        .clone()
        .startOf('year')
        .week(week)
        .startOf('week')
        .add(index, 'day');
      return new Day(day);
    });
};

const buildMonth = (monthMoment: moment.Moment): Month => {
  const firstWeek = monthMoment.clone().startOf('month').week();
  const lastWeek = ((week) => (week == 1 ? 53 : week))(
    monthMoment.clone().endOf('month').week()
  );

  return {
    monthMoment,
    week: Array(lastWeek - firstWeek + 1)
      .fill(0)
      .map((_, week) => buildWeek(monthMoment, firstWeek + week)),
  };
};

const buildYear = (today: moment.Moment): Year => {
  return Array(3)
    .fill(0)
    .map((_, index) => buildMonth(today.clone().add(index, 'month')));
};

export default buildYear;
