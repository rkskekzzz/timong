import React, { useMemo } from 'react';
import Styled from './DayLabel.styled';
import { Day } from 'src/Interface/DateType';
import { Divider } from '@mui/material';

const DayLabel: React.FC<{ selectedDay: Day }> = ({ selectedDay }) => {
  const dayLabel = useMemo(() => {
    if (!selectedDay) return 'Please Choose Date!';
    return (
      selectedDay.moment.format('Y') +
      '년 ' +
      selectedDay.moment.format('M') +
      '월 ' +
      selectedDay.moment.format('D') +
      '일 ' +
      ['일', '월', '화', '수', '목', '금', '토'][
        selectedDay.moment.format('d')
      ] +
      '요일'
    );
  }, [selectedDay]);

  return (
    <>
      <Styled.DayLabel>{dayLabel}</Styled.DayLabel>
      <Divider />
    </>
  );
};

export default React.memo(DayLabel);
