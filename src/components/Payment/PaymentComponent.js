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

export default function PaymentComponent() {
  const [hasTicket, setHasTicket] = useState(false);
  const { ticket, setTicket } = useContext(TicketContext);
  const token = useToken();

  useEffect(() => {
    axios
      .get('http://localhost:4000/tickets', { headers: { Authorization: `Bearer ${token}` } })
      .then((ans) => {
        const ticket = ans.data;
        setHasTicket(ticket);
      })
      .catch((err) => {
        console.log(err.message);
      });
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

          <TycketPaymentInfoComponent />

          {/* Formulário do cartão */}
          <StyledTypography variant="h5" color={'#8E8E8E'}>
            {' '}
            Pagamento
          </StyledTypography>

          <CreditCardPlaceholder />
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
