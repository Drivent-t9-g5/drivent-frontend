import React from 'react';
import styled from 'styled-components';

export default function HotelDiv(props) {
  const { hotel, setHotelId, hotelId } = props;
  const selected = hotelId === hotel.id;

  return (
    <ContainerHotel onClick={() => setHotelId(hotel.id)} selected={selected}>
      <img src={hotel.image} alt={hotel.name} />
      <div>
        <h1>{hotel.name}</h1>
        <div>
          <h2>Tipos de acomodação:</h2>
          <h3>{hotel.types}</h3>
        </div>
        <div>
          <h2>Vagas disponíveis:</h2>
          <h3>{hotel.disponible}</h3>
        </div>
      </div>
    </ContainerHotel>
  );
}

const ContainerHotel = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? '#ffeed2' : '#ebebeb')};
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
