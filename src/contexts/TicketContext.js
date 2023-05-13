import { createContext } from 'react';
import useToken from '../hooks/useToken';
import axios from 'axios';

const TicketContext = createContext();
export default TicketContext;

/* export function ticketProvider({ children }) {
  const token = useToken();
  let answer;

  axios
    .get('http://localhost:4000/tickets', { headers: { Authorization: `Bearer ${token}` } })
    .then((ans) => {
      answer = ans.data;
    })
    .catch((err) => {
      answer = undefined;
      console.log(err.message);
    });

  return <TicketContext.Provider data={answer}> {children} </TicketContext.Provider>;
} */
