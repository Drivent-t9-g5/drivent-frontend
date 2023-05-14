import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTicketType from '../../hooks/api/useTicketType';
import usePostTicket from '../../hooks/api/usePostTicket';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import TicketContext from '../../contexts/TicketContext';

export default function Ticket() {
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [showTicket, setShowTicket] = useState(true);
  const [showAccommodation, setShowAccommodation] = useState(false);
  const [showFinalization, setShowFinalization] = useState(false);
  const [ticketsTypes, setTicketsTypes] = useState(undefined);
  const [ticketIsRemote, setTicketIsRemote] = useState(undefined);
  const [ticketIncludesHotel, setTicketIncludesHotel] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const { ticketTypes } = useTicketType();
  const { postTicketLoading, postTicketAct } = usePostTicket();
  const { ticket, setTicket } = useContext(TicketContext);

  useEffect(() => {
    if (ticketTypes) {
      setTicketsTypes(ticketTypes);
    }
  }, [ticketTypes]);

  function handleTicketButtonClick(isRemote, name, price) {
    setSelectedTicket(name);
    setAmount(price);
    if (isRemote) {
      setShowAccommodation(false);
      setShowFinalization(true);
      setTicketIsRemote(true);
      setTicketIncludesHotel(false);
    } else {
      setShowAccommodation(true);
      setShowFinalization(false);
      setSelectedHotel('');
      setTicketIsRemote(false);
    }
  }

  function handleHotelButtonClick(buttonId) {
    const ticket = ticketsTypes.filter((t) => !t.isRemote);
    console.log(ticket);
    console.log(ticketsTypes);
    if (buttonId === 'with') {
      setAmount(amount + 350);
      setTicketIncludesHotel(true);
    } else {
      setAmount(ticket[0].price);
      setTicketIncludesHotel(false);
    }
    setSelectedHotel(buttonId);
    setShowFinalization(true);
  }

  async function handleBookButtonClick() {
    const selectedTicket = ticketTypes.filter(
      (t) => t.includesHotel === ticketIncludesHotel && t.isRemote === ticketIsRemote
    );

    const ticketTypeId = selectedTicket[0].id;

    try {
      await postTicketAct({ ticketTypeId });
      toast('Ingresso reservado com sucesso!');
      setTicket(ticketTypeId);
      console.log(ticketTypeId);
    } catch (error) {
      toast('Não foi possível reservar o ingresso!');
    }
  }

  return (
    <>
      <TicketContainer show={showTicket}>
        <Text>Primeiro, escolha sua modalidade de ingresso</Text>
        {ticketsTypes
          ?.filter((t) => t.includesHotel === false)
          .map((t) => (
            <OptionsButton
              selected={selectedTicket === t.name}
              onClick={() => handleTicketButtonClick(t.isRemote, t.name, t.price)}
            >
              {t.name} <br /> <span> R$ {t.price} </span>
            </OptionsButton>
          ))}
      </TicketContainer>
      <AccommodationContainer show={showAccommodation}>
        <Text>Ótimo! Agora escolha sua modalidade de hospedagem</Text>
        <OptionsButton selected={selectedHotel === 'without'} onClick={() => handleHotelButtonClick('without')}>
          Sem Hotel <br /> <span> R$ 0 </span>
        </OptionsButton>
        <OptionsButton selected={selectedHotel === 'with'} onClick={() => handleHotelButtonClick('with')}>
          Com Hotel <br /> <span> + R$ 350 </span>
        </OptionsButton>
      </AccommodationContainer>
      <DoneContainer show={showFinalization}>
        <Text>
          Fechado! O total ficou em <span>R$ {amount}</span>. Agora é só confirmar:
        </Text>
        <BookButton onClick={handleBookButtonClick}>RESERVAR INGRESSO</BookButton>
      </DoneContainer>
    </>
  );
}

const TicketContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const AccommodationContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const DoneContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  margin-top: 37px;
  color: #8e8e8e;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const OptionsButton = styled.button`
  width: 145px;
  height: 145px;
  color: #454545;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#ffffff')};
  font-size: 16px;
  border: ${(props) => (props.selected ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  margin: 12px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  }
  span {
    color: #898989;
    font-size: 14px;
  }
`;

const BookButton = styled.button`
  width: 162px;
  height: 37px;
  font-family: 'Roboto', sans-serif;
  color: #000000;
  background-color: #e0e0e0;
  border: 0px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  margin-top: 17px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
