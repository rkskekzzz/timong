import { doc, getDoc, setDoc } from '@firebase/firestore';
import { dbService } from 'src/firebase';
import { CalendarService } from 'src/Network/CalendarService';
import { User } from 'src/Interface/UserType';
import { State } from 'src/Interface/ContextType';
import { userDispatch } from 'src/Interface/ContextType';
import { Calendar } from 'src/Interface/CalendarType';

// 캘린더 리스트를 가져와서 클라이언트에 저장하는 hook
export async function fetchCalendarList(state: State, dispatch: userDispatch) {
  const docRef = doc(dbService, 'TestUsers', state.isSigned);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      user_id: state.isSigned,
      user_schedules: [],
      user_calendar_list: [],
    });
  } else {
    const { user_calendar_list } = docSnap.data();
    dispatch({
      type: 'SIGNED_SET_CALENDARLIST',
      calendarList: user_calendar_list,
    });
  }
}

// 캘린더를 새로 만들어서 캘린더 리스트에 등록하거나
// 기존의 캘린더를 캘린더 리스트에 등록하는 hook
export async function addSignedUserCalendar(element: User, state: State) {
  const docRef = doc(dbService, 'TestUsers', state.isSigned);
  let calendar;
  let calendar_id;
  if (element._id === '') {
    console.log('up');
    calendar = await CalendarService.create(element.name);
    console.log(calendar);
    calendar_id = calendar._id;
  } else {
    console.log('down');
    calendar_id = element._id;
  }

  const user = await getDoc(docRef);
  if (!user) alert('fail to fetch data..!!');
  if (!element._id && !calendar) alert('fail to fetch data..!!');
  setDoc(docRef, {
    ...user.data(),
    user_calendar_list: [
      ...user.data().user_calendar_list,
      {
        _id: calendar_id,
        user_name: '',
        name: element.name,
      },
    ],
  });
}

// 캘린더 리스트를 업데이트하는 hook
export async function updateSignedCalendarList(state: State) {
  const docRef = doc(dbService, 'TestUsers', state.isSigned);
  const user = await getDoc(docRef);
  if (!user) alert('fail to fetch data..!!');
  setDoc(docRef, {
    ...user.data(),
    user_calendar_list: [...state.calendarList],
  });
}

// 캘린더 리스트를 업데이트하는 hook
export async function updateSignedCalendarListByElement(
  state: State,
  element: Calendar[]
) {
  const docRef = doc(dbService, 'TestUsers', state.isSigned);
  const user = await getDoc(docRef);
  if (!user) alert('fail to fetch data..!!');
  setDoc(docRef, {
    ...user.data(),
    user_calendar_list: [...element],
  });
}

export async function deleteSignedCalendar(
  state: State,
  selectedIndex: number
) {
  console.log('here');
  const docRef = doc(dbService, 'TestUsers', state.isSigned);
  const user = await getDoc(docRef);
  if (!user) alert('fail to fetch data..!!');
  const newCalendarList = state.calendarList.filter(
    (_, index) => index !== selectedIndex
  );
  setDoc(docRef, {
    ...user.data(),
    user_calendar_list: newCalendarList,
  });
}
