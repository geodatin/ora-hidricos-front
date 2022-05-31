import { useLocation } from 'react-router-dom';

/**
 * This hooke works as an aux to the search params.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export { useQuery };
