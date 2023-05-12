import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { TycketPaymentInfo } from './TycketPaymentInfo';

import Button from '../Form/Button';
import CreditCardPlaceholder from './CreditCardPlaceholder';
import { useEffect, useState } from 'react';
import { getPersonalInformations } from '../../services/enrollmentApi';
import useToken from '../../hooks/useToken';
import PaymentComponent from './PaymentComponent';

export default function PaymentTicketContainer() {
  const [enrollment, setEnrollment] = useState(false);
  const token = useToken();
  useEffect(async() => {
    setEnrollment(await getPersonalInformations(token));
  });

  return (
    <>
      {/* Catei da página de inscrição */}
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>

      {enrollment ?
        <>PaymentComponentHERE</> :
        <IncompleteEnrollment />
      }
      {/* 
      Parte de visualização do pagamento 
      <PaymentComponent />
      
      */}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;
