import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';

const CreditCardPlaceholder = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function test() {
    console.log(state);
  }

  return (
    <>
      <CreditCardContainer>
        <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
        <StyledPaymentForm onSubmit={test}>
          <Input
            type="text"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <Input
              type="text"
              name="expiry"
              placeholder="Valid Thru"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          {/* <Button type="submit"> Oi </Button> */}
        </StyledPaymentForm>
      </CreditCardContainer>
      <SubmitContainer>
        <Button onClick= {test}>Finalizar Pagamento</Button>
      </SubmitContainer>
    </>
  );
};

const StyledPaymentForm = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;

  div {
    width: 90%;
    display: flex;
    align-items: flex-start;
    input{
      width: 45%;
    }
  }
`;

const CreditCardContainer = styled.div`
  width: 706px;
  height: 225px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

export default CreditCardPlaceholder;
