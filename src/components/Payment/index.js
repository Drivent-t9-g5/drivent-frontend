import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { TycketPaymentInfo } from './TycketPaymentInfo';

import Button from '../Form/Button';
import CreditCardPlaceholder from './CreditCardPlaceholder';

export default function PaymentTicketContainer() {
  return (
    <>
      {/* Catei da página de inscrição */}
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>
    
      {/* 
      Parte de visualização do pagamento 

      <StyledTypography variant="h5" color="#8E8E8E">
        {' '}
        Ingresso escolhido
      </StyledTypography>

      <TycketPaymentInfo>
        <StyledTypography variant="subtitle1">Presencial + Com Hotel</StyledTypography>
        <StyledTypography variant="subtitle1" color="#8E8E8E">
          R$ 600
        </StyledTypography>
      </TycketPaymentInfo>

      <StyledTypography variant="h5" color="#8E8E8E">
        {' '}
        Pagamento
      </StyledTypography>

      <CreditCardPlaceholder/>
      <SubmitContainer>
        <Button type="submit">Finalizar Pagamento</Button>
      </SubmitContainer> 
    
      */}

    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
