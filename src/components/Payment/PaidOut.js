import styled from 'styled-components'
import checkVector from '../../assets/images/checkVector.png'
export default function PaidOut() {
    return (
        <ConfirmationContainer>
            <img src={checkVector} />
            <ConfirmationMessage>
                <h5>Pagamento confirmado!</h5>
                <p>Prossiga para escolha de hospedagem e atividades</p>
            </ConfirmationMessage>
        </ConfirmationContainer>
    )
}
const ConfirmationContainer = styled.div`
    display: flex;
`;
const ConfirmationMessage = styled.div`
    padding-left: 14px;
    font-family: 'Roboto';
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
    h5{
        font-weight: 700;
    }
    p{
        font-weight: 400;
    }
`;