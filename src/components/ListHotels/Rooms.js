import React from 'react';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function RoomDiv(props) {
  const { room, setRoomId, roomId } = props;
  const selected = roomId === room.id;

  const handleClick = () => {
    setRoomId(room.id);
  };

  return (
    <Container selected={selected} onClick={handleClick}>
      <h1>{room.name}</h1>
      <div>
        {Array.from({ length: room.available }, (_, index) => (
          <StyledBsPerson
            key={index}
            size={22}
            selected={selected && index === 0}
          />
        ))}
        {Array.from({ length: room.reserved }, (_, index) => (
          <BsFillPersonFill key={index} size={22} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 45px;
  width: 190px;
  border-radius: 10px;
  margin: 14px 18px 14px 0;
  border: 1px solid #cecece;
  display: flex;
  justify-content: space-between;
  padding: 0 4px 0 10px;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#ffeed2' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #ffeed2;
  }

  h1 {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    color: #454545;
  }

  div {
    display: flex;
  }
`;

const StyledBsPerson = styled(BsPerson)`
  color: ${(props) => (props.selected ? '#FF4791' : 'black')};
`;
