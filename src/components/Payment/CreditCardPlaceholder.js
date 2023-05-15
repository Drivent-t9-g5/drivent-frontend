import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState } from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import creditCardType from 'credit-card-type';
import { postPayment } from '../../services/paymentApi';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { useContext } from 'react';
import TicketContext from '../../contexts/TicketContext';

const CreditCardPlaceholder = ({ ticketId }) => {
  const token = useToken();
  const { ticket } = useContext(TicketContext);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    issuer: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'number') {
      const cardType = creditCardType(value)[0];
      const issuer = cardType ? cardType.niceType : '';
      setCardInfo((prev) => ({ ...prev, [name]: value, issuer }));
    } else {
      setCardInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setCardInfo((prev) => ({ ...prev, focus: evt.target.name }));
  };

  async function paymentProcess() {
    const date = [cardInfo.expiry.slice(0, 2), cardInfo.expiry.slice(2)];
    const expirationDate = new Date(`20${date[1]}`, date[0] - 1);

    const cardData = {
      ...cardInfo,
      number: parseInt(cardInfo.number),
      expirationDate,
      cvv: parseInt(cardInfo.cvc),
    };
    delete cardData.cvc;
    delete cardData.focus;
    delete cardData.expiry;

    const body = { ticketId, cardData };
    try {
      await postPayment(body, token);

      toast('Pagamento realizado com sucesso!');
    } catch (error) {
      toast('Não foi possível realizar o pagamento!');
    }

    console.log(body);
  }

  return (
    <>
      <CreditCardContainer>
        <Cards
          number={cardInfo.number}
          expiry={cardInfo.expiry}
          cvc={cardInfo.cvc}
          name={cardInfo.name}
          focused={cardInfo.focus}
        />
        <StyledPaymentForm onSubmit={paymentProcess}>
          <Input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

          <div>
            <Input
              type="text"
              name="expiry"
              placeholder="Valid Thru"
              value={cardInfo.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Input
              type="text"
              name="cvc"
              placeholder="CVV"
              value={cardInfo.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          {/* <Button type="submit"> Oi </Button> */}
        </StyledPaymentForm>
      </CreditCardContainer>
      <SubmitContainer>
        <Button onClick={paymentProcess}>Finalizar Pagamento</Button>
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
    input {
      width: 100%;
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
