import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitie() {
  const token = useToken();

  const {
    data: activitie,
    loading: activitieLoading,
    error: activitieError,
    act: getActivitie,
  } = useAsync((eventId, date) => activitiesApi.getActivitiesByDate(token, eventId, date));

  return {
    activitie,
    activitieLoading,
    activitieError,
    getActivitie,
  };
}
