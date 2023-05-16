import styled from 'styled-components';
import RoomDiv from './Rooms';
import HotelDiv from './Hotel';
import Button from '../Form/Button';
import { toast } from 'react-toastify';
import { postBookRoom } from '../../services/bookingApi';

export default function ChooseHotels(props) {
  const {
    token,
    hotelId,
    notPossible,
    errMessage,
    hotels,
    setHotelId,
    rooms,
    roomId,
    setRoomId,
    setAllocatedUser
  } = props;

  async function bookingRoom() {
    console.log('TRY BOOKING', 'hotelId:', hotelId, 'roomId:', roomId);
    try {
      const respose = await postBookRoom(roomId, token);
      toast('Reserva feita com sucesso');
      console.log(respose);
      setAllocatedUser(respose);
    } catch (error) {
      toast('Quarto indisponivel');
    }
  }

  if (hotelId === 0)
    return (
      <Hotels>
        {notPossible ? (
          <Warning>
            <p>
              {errMessage === 'Request failed with status code 400'
                ? 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'
                : errMessage === 'Request failed with status code 401'
                  ? 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'
                  : 'Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades'}
            </p>
          </Warning>
        ) : (
          <>
            <h1>Primeiro, escolha seu hotel</h1>
            <div>
              {hotels?.map((hotel) => (
                <HotelDiv key={hotel.id} hotel={hotel} hotelId={hotelId} setHotelId={setHotelId} />
              ))}
            </div>
          </>
        )}
      </Hotels>
    );

  if (hotelId !== 0)
    return (
      <>
        <Hotels>
          <h1>Primeiro, escolha seu hotel</h1>
          <div>
            {hotels?.map((hotel) => (
              <HotelDiv key={hotel.id} hotel={hotel} hotelId={hotelId} setHotelId={setHotelId} />
            ))}
          </div>
        </Hotels>
        <h1>Ótima pedida! Agora escolha seu quarto:</h1>
        <RoomsDiv>
          {rooms?.map((room) => (
            <RoomDiv key={room.id} room={room} roomId={roomId} setRoomId={setRoomId} />
          ))}
        </RoomsDiv>
        {
          hotelId !== 0 && roomId !== 0 ?
            <SubmitContainer>
              <Button onClick={bookingRoom}>Reservar quarto</Button>
            </SubmitContainer> :
            <></>
        }
      </>
    );
}
const Hotels = styled.div`
  > h1 {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 29px;
  }

  > div {
    display: flex;
  }
`;
const Warning = styled.div`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 223px;
  padding-right: 5%;

  p{
    width: 388px;
  }
`;
const RoomsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 88%;
  align-items: start;
`;
const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
