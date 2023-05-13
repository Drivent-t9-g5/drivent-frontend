import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Hotel from '../../pages/Dashboard/Hotel';
import { getHotels, getRooms } from '../../services/hotelsApi';
import useToken from '../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { BsPerson } from 'react-icons/bs';

export default function ListHotels() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
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
          setRooms(roomsData.Rooms || []);
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

  if (!hotels) return 'carregando';

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
              hotels.map((hotel) => (
                <HotelDiv key={hotel.id} onClick={() => setHotelId(hotel.id)}>
                  <img src={hotel.image} alt={hotel.name} />
                  <div>
                    <h1>{hotel.name}</h1>
                    <div>
                      <h2>Tipos de acomodação:</h2>
                      <h3>Single, Double e Triple</h3>
                    </div>
                    <div>
                      <h2>Vagas disponíveis:</h2>
                      <h3>119</h3>
                    </div>
                  </div>
                </HotelDiv>
              ))
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
            {hotels.map((hotel) => (
              <HotelDiv key={hotel.id} onClick={() => setHotelId(hotel.id)}>
                <img src={hotel.image} alt={hotel.name} />
                <div>
                  <h1>{hotel.name}</h1>
                  <div>
                    <h2>Tipos de acomodação:</h2>
                    <h3>Single, Double e Triple</h3>
                  </div>
                  <div>
                    <h2>Vagas disponíveis:</h2>
                    <h3>119</h3>
                  </div>
                </div>
              </HotelDiv>
            ))}
          </Hotels>
          <h1>Ótima pedida! Agora escolha seu quarto:</h1>
          <RoomsDiv>
            {rooms?.map((room) => (
              <RoomDiv key={room.id}>
                <h1>{room.name}</h1>
                <div>
                  {Array.from({ length: room.capacity }, (_, index) => (
                    <BsPerson key={index} size={22}  />
                  ))}
                </div>
              </RoomDiv>
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

const HotelDiv = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 22px;
  margin-bottom: 22px;
  &:hover {
    background-color: #ffeed2;
    cursor: pointer;
  }

  img {
    margin-top: 12px;
    height: 109px;
    width: 168px;
    border-radius: 5px;
  }

  div {
    width: 100%;
    height: 62%;
    margin-top: 3px;

    h1 {
      font-family: Roboto;
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      text-align: left;
      padding-left: 14px;
    }

    div {
      display: flex;
      flex-direction: column;
      padding-left: 14px;
      height: 40px;

      h2 {
        font-family: Roboto;
        font-size: 12px;
        font-weight: 700;
        line-height: 14px;
      }

      h3 {
        font-family: Roboto;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
      }
    }
  }
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

const RoomDiv = styled.div`
  height: 45px;
  width: 190px;
  border-radius: 10px;
  margin: 14px;
  border: 1px solid #cecece;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover{
    cursor: pointer;
    background-color: #FFEED2;
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
