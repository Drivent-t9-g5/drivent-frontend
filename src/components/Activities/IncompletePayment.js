/* eslint-disable eol-last */
import styled from 'styled-components';

export default function IncompletePaymentActivities() {
  return (
    <Warning>
      <p>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
    </Warning>
  );  
}

const Warning = styled.div`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 223px;
  padding-right: 5%;

  p{
    width: 388px;
  }
`;