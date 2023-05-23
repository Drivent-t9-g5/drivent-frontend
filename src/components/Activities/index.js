import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { getPersonalInformations } from '../../services/enrollmentApi';
import useToken from '../../hooks/useToken';
import { useState } from 'react';
import IncompleteEnrollmentActivities from './IncompleteEnrollment';
import { getTicketInformation } from '../../services/ticketApi';
import IncompletePaymentActivities from './IncompletePayment';
import ActivitiesComponent from './ActivitiesComponent';
import IncompleteOnlineEvent from './IncompleteOnlineEvent';

export default function ActivitiesContainer() {
  const [enrollment, setEnrollment] = useState(false);
  const [ticket, setTicket] = useState(false);
  const token = useToken();

  useEffect(async() => {
    setEnrollment(await getPersonalInformations(token));
    setTicket(await getTicketInformation(token));
    console.log(ticket);
  }, [token]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      {enrollment ? (
        ticket.status === 'PAID' ? (
          !ticket.TicketType.isRemote ? (
            <ActivitiesComponent />
          ) : (
            <IncompleteOnlineEvent/>
          )
        ) : (
          <IncompletePaymentActivities />
        )
      ) : (
        <IncompleteEnrollmentActivities />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;
