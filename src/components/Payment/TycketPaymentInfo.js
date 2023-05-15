import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTicketInformation } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';

export default function TycketPaymentInfoComponent({ setTicketId }) {
  const [ticketType, setTicketType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState('');
  const token = useToken();

  useEffect(async() => {
    if (isLoading) {
      try {
        const ticketInfo = await getTicketInformation(token);
        setTicketType(ticketInfo.TicketType);
        setTicketId(ticketInfo.id);
        setIsLoading(!isLoading);
      } catch (err) {
        console.log('Vazio: ', err.message);
      }
    }
    setInfo(`${ticketType.name} ${ticketType.includesHotel ? '+ Hotel' : ''}`);

    console.log(ticketType);
  }, [isLoading, info]);

  return (
    <>
      <TycketPaymentInfo>
        <StyledTypography variant="subtitle1"> {info} </StyledTypography>
        <StyledTypography variant="subtitle1" color={'#8E8E8E'}>
          R$ {ticketType.price}
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
