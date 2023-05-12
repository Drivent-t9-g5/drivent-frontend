import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import Button from '../Form/Button';
import PaymentComponent from './PaymentComponent';

export default function PaymentTicketContainer() {
  return (
    <>
      {/* Catei da página de inscrição */}
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>

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
