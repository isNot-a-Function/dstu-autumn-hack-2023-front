export interface steamLoginData {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}
export interface UserData {
  avatar: string;
  balance: 100;
  id: string;
  role: string;
  steamId: string;
  name: string;
}

export interface ISignUpUser {
  email: string;
  password: string;
  role: "executor" | "customer";
}

export interface ISignInUser {
  email: string;
  password: string;
}
