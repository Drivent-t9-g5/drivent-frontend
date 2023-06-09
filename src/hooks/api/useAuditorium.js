import useAsync from '../useAsync';
import useToken from '../useToken';

import * as auditoriumApi from '../../services/auditoriumApi';

export default function useAuditorium() {
  const token = useToken();

  const {
    data: auditoriumData,
    loading: auditoriumLoading,
    error: auditoriumError,
    act: getAuditorium,
  } = useAsync(() => auditoriumApi.getAuditorium(token));

  return {
    auditoriumData,
    auditoriumLoading,
    auditoriumError,
    getAuditorium,
  };
}
