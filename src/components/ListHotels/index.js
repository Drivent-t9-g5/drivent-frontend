import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Hotel from '../../pages/Dashboard/Hotel';
import { getHotels, getRooms } from '../../services/hotelsApi';
import useToken from '../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import RoomDiv from './Rooms';
import HotelDiv from './Hotel';

export default function ListHotels() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [notPossible, setNotPossible] = useState(true);

  useEffect(() => {
    const fetchHotels = async() => {
      try {
        const hotelsData = await getHotels(token);
        setHotels(hotelsData);
        setNotPossible(false);

        if (hotelId !== 0) {
          const roomsData = await getRooms(token, hotelId);
          console.log(roomsData);
          const resolvedRooms = await roomsData.Rooms;
          setRooms(resolvedRooms);
        }
        console.log(hotelsData);
      } catch (err) {
        console.log(err);
        setNotPossible(true);
        err.message !== 'CannotListHotelsError'
          ? toast('Ainda é necessário fazer o pagamento de um ingresso para ter acesso a hospedagens')
          : toast('Seu ingresso não inclui a reserva de um Hotel!');
      }
    };

    fetchHotels();
  }, [token, hotelId]);

  console.log('hotels', hotels);
  console.log('rooms', rooms);

  if (!hotels) return null;

  if (hotelId === 0)
    return (
      <>
        <Ctnr>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <h1>Primeiro, escolha seu hotel</h1>
          <Hotels>
            {notPossible ? (
              <h1>Faça o pagamento de um ticket que inclui uma reserva de Hotel para desbloquear essa página!</h1>
            ) : (
              hotels?.map((hotel) => <HotelDiv key={hotel.id} hotel={hotel} hotelId={hotelId} setHotelId={setHotelId}  />)
            )}
          </Hotels>
        </Ctnr>
      </>
    );
  if (hotelId !== 0) {
    return (
      <>
        <Ctnr>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <Hotels>
            {hotels?.map((hotel) => (
              <HotelDiv key={hotel.id} hotel={hotel} hotelId={hotelId} setHotelId={setHotelId}  />
            ))}
          </Hotels>
          <h1>Ótima pedida! Agora escolha seu quarto:</h1>
          <RoomsDiv>
            {rooms?.map((room) => (
              <RoomDiv key={room.id} room={room} roomId={roomId} setRoomId={setRoomId}/>
            ))}
          </RoomsDiv>
        </Ctnr>
      </>
    );
  }
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

const Hotels = styled.div`
  display: flex;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const RoomsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 88%;
  align-items: start;
`;
