import { State } from 'src/Interface/ContextType';

export function useCalendarList(
  state: State,
  selectedIndex: number,
  name: string
) {
  if (selectedIndex === -1) return;
  const calendarList = state.calendarList.map((calendar) => {
    const _calendar = calendar;
    if (calendar._id === state.calendarList[selectedIndex]._id)
      _calendar.user_name = name;

    return calendar;
  });
  return calendarList;
}
