import React from 'react';
import { BsPerson } from 'react-icons/bs';
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
        {Array.from({ length: room.capacity }, (_, index) => (
          <BsPerson key={index} size={22} background-color='black'/>
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
  justify-content: space-around;
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
