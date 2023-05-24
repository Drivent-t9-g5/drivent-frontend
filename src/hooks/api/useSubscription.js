import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useSubscription() {
  const token = useToken();

  const {
    data: subscriptions,
    loading: subscriptionsLoading,
    error: subscriptionsError,
    act: getSubscriptions,
  } = useAsync(() => activitiesApi.getSubscriptionsByUserId(token), false);

  return {
    subscriptions,
    subscriptionsLoading,
    subscriptionsError,
    getSubscriptions,
  };
}
