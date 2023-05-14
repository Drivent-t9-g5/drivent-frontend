import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import CreditCardPlaceholder from './CreditCardPlaceholder';
import TycketPaymentInfoComponent from './TycketPaymentInfo';
import { useEffect } from 'react';
import { useState } from 'react';
import Ticket from '../Ticket';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { useContext } from 'react';
import TicketContext from '../../contexts/TicketContext';
import { getTicketInformation } from '../../services/ticketApi';

export default function PaymentComponent() {
  const [hasTicket, setHasTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ticket } = useContext(TicketContext);
  const [ticketId, setTicketId] = useState();
  const token = useToken();

  useEffect(async() => {
    console.log('Ticket: ', ticket);
    setIsLoading(true);
    try {
      setHasTicket(await getTicketInformation(token));
    } catch (error) {
      console.log(error.message);
    }
  }, [ticket]);

  return (
    <>
      {/* Informação do ingresso */}
      {hasTicket ? (
        <>
          <StyledTypography variant="h5" color={'#8E8E8E'}>
            {' '}
            Ingresso escolhido
          </StyledTypography>

          <TycketPaymentInfoComponent setTicketId = {setTicketId}/>

          {/* Formulário do cartão */}
          <StyledTypography variant="h5" color={'#8E8E8E'}>
            {' '}
            Pagamento
          </StyledTypography>

          <CreditCardPlaceholder ticketId = {ticketId} />
        </>
      ) : (
        <Ticket />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;
