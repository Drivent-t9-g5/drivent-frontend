import styled from 'styled-components';

export default function IncompleteEnrollment() {
  return (
    <Warning>
      <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
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
