export interface AuthData {
  user: any | null;
  session: any | null;
  weakPassword: boolean | null;
}

export interface AuthType {
  isLoggedIn: boolean;
  status: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    specialization: string,
    about: string
  ) => Promise<void>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  about: string;
  userId: string;
  token: string;
}
