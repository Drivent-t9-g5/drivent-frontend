import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHotels, getRooms } from '../../services/hotelsApi';
import useToken from '../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import ChooseHotels from './ChooseHotels';
import { getUserBooking } from '../../services/bookingApi';
import BookedRoom from './BookedRoom';

export default function ListHotels() {
  const token = useToken();
  const [notPossible, setNotPossible] = useState(true);
  const [allocatedUser, setAllocatedUser] = useState(false);
  const [roomUpdate, setRoomUpdate] = useState(0);

  useEffect(async() => {
    try {
      const book = await getUserBooking(token);
      console.log('book:', book);
      setAllocatedUser(book.Room);
    } catch (err) {
      console.log('err', err);
    }
  }, [roomUpdate]);

  console.log('allocatedUser', allocatedUser);

  return (
    <>
      <Ctnr>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        {allocatedUser ?
          (<BookedRoom room={allocatedUser} token={token} roomUpdate={roomUpdate} />)
          : (<ChooseHotels
            token={token}
            notPossible={notPossible}
            setNotPossible={setNotPossible}
            setAllocatedUser={setAllocatedUser}
            roomUpdate={roomUpdate}
            setRoomUpdate={setRoomUpdate}
          />)
        }
      </Ctnr>
    </>
  );
}

const Ctnr = styled.div`
  display: flex;
  flex-direction: column;
  > h1 {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 29px;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

