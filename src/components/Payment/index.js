import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useContext, useEffect, useState } from 'react';
import { getPersonalInformations } from '../../services/enrollmentApi';
import useToken from '../../hooks/useToken';
import PaymentComponent from './PaymentComponent';
import IncompleteEnrollment from './IncompleteEnrollment';
import UserContext from '../../contexts/UserContext';

export default function PaymentTicketContainer() {
  const [enrollment, setEnrollment] = useState(false);
  const token = useToken();

  useEffect(async() => {
    setEnrollment(await getPersonalInformations(token));
  }, [token]);

  return (
    <>
      {/* Catei da página de inscrição */}
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>

      {enrollment ? (
        <>
          <PaymentComponent />
        </>
      ) : (
        <IncompleteEnrollment />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;
