import React, { useState } from 'react';
import Styled from './List.styled';
import { Calendar } from 'src/Interface/CalendarType';
import Card from './Card';
import AddModal from 'src/Components/Modal';
import { addSignedUserCalendar } from 'src/Hooks/firebaseRelationHooks';

const List: React.FC<{
  listRef: React.RefObject<HTMLDivElement>;
  calendarList: Calendar[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ listRef, calendarList, selectedIndex, setSelectedIndex }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleModalOpen = () => setIsShowModal(true);
  const handleModalClose = () => setIsShowModal(false);

  const handleCardTabbed = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <AddModal
        isShowModal={isShowModal}
        handleModalClose={handleModalClose}
        placeholder="캘린더 이름을 입력해주세요..."
        action={addSignedUserCalendar}
      />
      <Styled.List ref={listRef}>
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
