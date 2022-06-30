import React, { useContext, useEffect, useState } from 'react';
import Styled from './List.styled';
import { UserContext } from 'src/App';
import { Calendar } from 'src/Interface/CalendarType';
import Card from './Card';
import AddModal from 'src/Components/Modal';
import { useFetchCalendarList } from 'src/Hooks/firebaseRelationHooks';
import { useAddCalendar } from 'src/Hooks/firebaseRelationHooks';

const List: React.FC<{
  calendarList: Calendar[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ calendarList, selectedIndex, setSelectedIndex }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserContext);
  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  const handleCardTabbed = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (state.isSigned) useFetchCalendarList(state, dispatch);
  }, [state.isSigned]);

  useEffect(() => {
    if (state.calendarList.length > 0) setSelectedIndex(0);
  }, [state.calendarList]);

  return (
    <>
      <AddModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        placeholder="캘린더 이름을 입력해주세요..."
        action={useAddCalendar}
      />
      <Styled.List>
        {calendarList.map((element, index) => {
          return (
            <Card
              selected={selectedIndex === index ? true : false}
              key={element._id + index}
              group={element}
              handleCardTabbed={() => handleCardTabbed(index)}
            />
          );
        })}
        <Card
          selected={false}
          group={null}
          handleCardTabbed={handleModalOpen}
        />
      </Styled.List>
    </>
  );
};

export default List;
