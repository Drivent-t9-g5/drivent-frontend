import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Form/Button';
import { getHotelById, getHotels, getRooms } from '../../services/hotelsApi';

export default function BookedRoom({ room, token }) {
  const hotelId = room.hotelId;
  const roomName = room.name;
  const [membersMessage, setMembersMessage] = useState('erro');
  const [hotelName, setHotelName] = useState('Hotel Name');
  const [hotelImage, setHotelImage] = useState('');

  let roomCapacity = room.capacity;
  if (roomCapacity == 1) roomCapacity = 'single';
  if (roomCapacity == 2) roomCapacity = 'double';
  if (roomCapacity == 3) roomCapacity = 'triple';

  useEffect(async() => {
    try {
      const hotelData = await getHotelById(token, hotelId);
      setHotelName(hotelData.name);
      setHotelImage(hotelData.image);

      const roomsAtHotel = await getRooms(token, hotelId);
      let otherReservations = null;
      let message = '';
      roomsAtHotel.forEach((room) => {
        if (room.name == roomName) otherReservations = room.reserved - 1;
      });

      if(otherReservations === 0) message = 'Somente você';
      if(otherReservations !== 0) message = `Você e mais ${otherReservations} pessoas`;
      setMembersMessage(message);
    } catch (error) {
      console.log(error);
    }
  }, [hotelId]);

  function changeRoom() {
    console.log('Should try change room');
  };

  return (
    <ContainerBook>
      <h1>Você já escolheu seu quarto:</h1>
      <Booked>
        <img src={hotelImage} />
        <section>
          <h2>{hotelName}</h2>
          <div>
            <h3>Quarto reservado</h3>
            <p>{roomName} ({roomCapacity})</p>
          </div>
          <div>
            <h3>Pessoas no seu quarto</h3>
            <p>{membersMessage}</p>
          </div>
        </section>
      </Booked>
      <SubmitContainer>
        <Button onClick={changeRoom}>Trocar de quarto</Button>
      </SubmitContainer>
    </ContainerBook>
  );
}
const ContainerBook = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  h1 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    margin-bottom: 29px;
    color: #8E8E8E;
  }
`;
const Booked = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  background-color: #ffeed2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 22px;
  margin-bottom: 22px;
  img {
    margin-top: 16px;
    height: 109px;
    width: 168px;
    border-radius: 5px;
  }
  section {
    width: 100%;
    height: 62%;
    padding-left: 15px;
    h2 {
      font-size: 20px;
      font-weight: 400;
      line-height: 23px;
      text-align: left;
      padding: 10px 0;
      color: #343434;
    }
    h3 {
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      color: #3C3C3C;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      text-align: left;
      color: #3C3C3C;
      padding-top: 2px;
      padding-bottom: 14px;
    }    
  }
`;
const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;
`;
