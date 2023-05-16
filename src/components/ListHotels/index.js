import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHotels, getRooms } from '../../services/hotelsApi';
import useToken from '../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import ChooseHotels from './ChooseHotels';

export default function ListHotels() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [notPossible, setNotPossible] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const [allocatedUser, setAllocatedUser] = useState(false);

  useEffect(() => {
    const fetchHotels = async() => {
      try {
        const hotelsData = await getHotels(token);
        setHotels(hotelsData);
        setNotPossible(false);
        setRoomId(0);

        if (hotelId !== 0) {
          const roomsData = await getRooms(token, hotelId);
          console.log(roomsData);
          const resolvedRooms = await roomsData;
          setRooms(resolvedRooms);
        }
        console.log(hotelsData);
      } catch (err) {
        console.log(err);
        setNotPossible(true);
        setErrMessage(err.message);
        console.log('error: ' + err);
        err.message === 'Request failed with status code 400'
          ? toast()
          : err.message === 'Request failed with status code 401'
            ? toast('Ainda é necessário fazer o pagamento de um ingresso para ter acesso a hospedagens')
            : toast('Seu ingresso não inclui a reserva de um Hotel!');
      }
    };

    fetchHotels();
  }, [token, hotelId]);

  console.log('hotels', hotels);
  console.log('rooms', rooms);

  if (!hotels) return null;

  return (
    <>
      <Ctnr>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

        <ChooseHotels
          token={token}
          hotelId={hotelId}
          notPossible={notPossible}
          errMessage={errMessage}
          hotels={hotels}
          setHotelId={setHotelId}
          rooms={rooms}
          roomId={roomId}
          setRoomId={setRoomId}
          setAllocatedUser={setAllocatedUser}
        />
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

