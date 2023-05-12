import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import CreditCardPlaceholder from './CreditCardPlaceholder';
import TycketPaymentInfoComponent from './TycketPaymentInfo';

export default function PaymentComponent() {
  return (
    <>
      <StyledTypography variant="h5" color={'#8E8E8E'}>
        {' '}
        Ingresso escolhido
      </StyledTypography>

      <TycketPaymentInfoComponent />

      <StyledTypography variant="h5" color={'#8E8E8E'}>
        {' '}
        Pagamento
      </StyledTypography>

      <CreditCardPlaceholder />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;
