import { getProfile } from 'api/profile';
import { IUserProfileData } from 'common/interface';
import { USER_PROFILE } from 'constants/queryKey';
import { useQuery } from 'react-query';

export default function useProfile(isAuthenticated: boolean) {
  const { data, isLoading }: IUserProfileData = useQuery([USER_PROFILE, isAuthenticated], getProfile, {
    enabled: isAuthenticated,
  });
  return { ...data, isLoading };
}
