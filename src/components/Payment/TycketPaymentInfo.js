import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function TycketPaymentInfoComponent() {
  return (
    <>
      <TycketPaymentInfo>
        <StyledTypography variant="subtitle1">Presencial + Com Hotel</StyledTypography>
        <StyledTypography variant="subtitle1" color={'#8E8E8E'}>
          R$ 600
        </StyledTypography>
      </TycketPaymentInfo>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  color: ${(props) => (props.color === '' ? '' : props.color)};
`;

const TycketPaymentInfo = styled.div`
  width: 290px;
  height: 110px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-color: #ffeed2;
  border-radius: 20px;

  padding-top: 10px;
  margin-bottom: 10px;
`;
