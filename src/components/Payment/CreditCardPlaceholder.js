import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function CreditCardPlaceholder() {
  const [creditCardInfo, setCreditCardInfo] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  useEffect(() => {}, [creditCardInfo]);

  /* function handleInputFocus(e) {
    setCreditCardInfo({ focus: e.target.name });
  } */

  function handleInputChange(e) {
    const { name, value } = e.target;

    setCreditCardInfo({ [name]: value });
  }

  function teste(e) {
    e.preventDefault();
    console.log('OI');
  }

  return (
    <CreditCardContainer>
      <Cards
        cvc={creditCardInfo.cvc}
        expiry={creditCardInfo.expiry}
        focused={creditCardInfo.focus}
        name={creditCardInfo.name}
        number={creditCardInfo.number}
      />

      <form onSubmit={teste}>
        <Input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          //onFocus={handleInputFocus}
        />
        <Input type="tel" name="name" placeholder="Name" onChange={handleInputChange} //onFocus={handleInputFocus} 
        />
        <Input
          type="tel"
          name="expiry"
          placeholder="Valid Thru"
          onChange={handleInputChange}
          //onFocus={handleInputFocus}
        />
        <Input type="tel" name="cvv" placeholder="CVV" onChange={handleInputChange} //onFocus={handleInputFocus} 
        />

        <Button type="submit">Oi</Button>
      </form>
    </CreditCardContainer>
  );
}

const CreditCardContainer = styled.div`
  width: 706px;
  height: 225px;

  display: flex;
  flex-direction: row;
`;
