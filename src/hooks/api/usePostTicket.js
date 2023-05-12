import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function usePostTicket() {
  const token = useToken();

  const {
    loading: postTicketLoading,
    error: postTicketError,
    act: postTicketAct,
  } = useAsync((data) => ticketApi.postTicket(data, token), false);

  return {
    postTicketLoading,
    postTicketError,
    postTicketAct,
  };
}
