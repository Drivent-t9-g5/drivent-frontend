import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Hotel from '../../pages/Dashboard/Hotel';
import { getHotels } from '../../services/hotelsApi';
import useToken from '../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { BsPersonFill } from 'react-icons/bs';

export default function ListHotels() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [notPossible, setNotPossible] = useState(true);
  useEffect(() => {
    const fetchHotels = async() => {
      try {
        const hotelsData = await getHotels(token);
        setHotels(hotelsData);
        setNotPossible(false);
        console.log(hotelsData);
      } catch (err) {
        console.log(err);
        setNotPossible(true);
        if (err.message === 'NotFoundError')
          return toast('Ainda é necessário fazer o pagamento de um ingresso para ter acesso a hospedagens');
        if (err.message === 'CannotListHotelsError') return toast('Seu ingresso não inclui a reserva de um Hotel!');
      }
    };

    fetchHotels();
  }, [hotelId]);

  console.log('hotels', hotels);
  if (!hotels) return 'carregando';
  if (hotelId === 0)
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <Hotels>
          {notPossible ? (
            <h1>Faça o pagamento de um ticket que inclui uma reserva de Hotel para desbloquear essa pagina!</h1>
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
      </>
    );
  if (hotelId !== 0)
    return (
      <>
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
        <RoomDiv>
          <BsPersonFill />
          <BsPersonFill />
        </RoomDiv>
      </>
    );
}

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
  &:hover{
    background-color: #FFEED2;
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

const RoomDiv = styled.div`
  height: 45px;
  width: 190px;
  border-radius: 10px;
  border: 1px solid #CECECE;
`;
