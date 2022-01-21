import React, { useState, useContext } from 'react';
import Styled from './Calendar.styled';
import MonthBox from './MonthBox';
import { ThemeContext } from '../Timong';

import moment from 'moment';
import { Year } from 'src/Interface/DateType';
import { buildDate } from 'src/Utils';
// import { AutoSizer, List } from 'react-virtualized';

const initialYear: Year = buildDate(moment());

const Calendar = () => {
  const theme = useContext(ThemeContext);
  const [year, setYear] = useState<Year>(initialYear);

  // const scrollListener = (params) => {
  //   if (params.scrollTop + params.clientHeight >= params.scrollHeight - 300) {
  //     setYear([
  //       ...year,
  //       ...buildDate(year[year.length - 1].monthMoment.clone().add(1, 'M')),
  //     ]);
  //   }
  // };
  // const rowRanderer = ({ index, style }) => {
  //   const month = year[index];
  //   return (
  //     <div style={style}>
  //       <MonthBox key={month.monthMoment.format('MMMM')} month={month} />
  //     </div>
  //   );
  // };

  return (
    <Styled.CalendarPaddingBox color={theme.foreground}>
      {year.map((month) => (
        <MonthBox key={month.monthMoment.format('MMMM')} month={month} />
      ))}
    </Styled.CalendarPaddingBox>
  );
};

export default React.memo(Calendar);

{
  /* <AutoSizer>
      {({ width }) => (
        <List
          rowCount={year.length}
          height={1000}
          rowHeight={600}
          width={width}
          rowRenderer={rowRanderer}
          onScroll={scrollListener}
          overscanRowCount={5}
        />
      )}
    </AutoSizer> */
}
