export interface UserReturn {
  userID: string | number;
  name: string;
  email: string;
  password: string;
  sessionToken?: string;
}
