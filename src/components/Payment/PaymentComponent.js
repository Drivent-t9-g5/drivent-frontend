import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import CreditCardPlaceholder from './CreditCardPlaceholder';
import TycketPaymentInfoComponent from './TycketPaymentInfo';
import { useEffect } from 'react';
import { useState } from 'react';
import Ticket from './Ticket';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { useContext } from 'react';
import TicketContext from '../../contexts/TicketContext';
import { getTicketInformation } from '../../services/ticketApi';
import PaidOut from './PaidOut';
import { getPayment } from '../../services/paymentApi';

export default function PaymentComponent() {
  const [hasTicket, setHasTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ticket } = useContext(TicketContext);
  const [ticketId, setTicketId] = useState();
  const token = useToken();
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);
  const [finalizePayment, setFinalizePayment] = useState(false);

  useEffect(async() => {
    console.log('Ticket: ', ticket);
    setIsLoading(true);
    try {
      setHasTicket(await getTicketInformation(token));
    } catch (error) {
      console.log(error.message);
    }
  }, [ticket]);
  useEffect(async() => {
    if(hasTicket.id)setPaymentConfirmation(await getPayment(hasTicket.id, token));
  }, [hasTicket, finalizePayment]);

  return (
    <>
      {/* Informação do ingresso */}
      {hasTicket ? (
        <>
          <StyledTypography variant="h5" color={'#8E8E8E'}>
            {' '}
            Ingresso escolhido
          </StyledTypography>

          <TycketPaymentInfoComponent setTicketId={setTicketId} />

          {/* Formulário do cartão */}
          <StyledTypography variant="h5" color={'#8E8E8E'}>
            {' '}
            Pagamento
          </StyledTypography>
          {paymentConfirmation ?
            <PaidOut /> :
            <CreditCardPlaceholder ticketId={ticketId} setFinalizePayment={setFinalizePayment}/>
          }
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
