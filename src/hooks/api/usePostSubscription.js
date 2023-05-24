import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function usePostSubscription() {
  const token = useToken();

  const {
    loading: postSubscriptionLoading,
    error: postSubscriptionError,
    act: postSubscriptionAct,
  } = useAsync((data) => activitiesApi.postSubscription(data, token), false);

  return {
    postSubscriptionLoading,
    postSubscriptionError,
    postSubscriptionAct,
  };
}
