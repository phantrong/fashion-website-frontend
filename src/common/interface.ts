export interface IUserProfile {
  first_name: string;
  last_name: string;
  avatar: string;
  birthday: string;
  email: string;
  status: string;
  notifications_email: number;
}

export interface IUserProfileData {
  data?: IUserProfile;
  isLoading: boolean;
}
