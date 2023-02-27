export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  type: string;
  email: string;
  password: string;
  createdAt: Date;
  enabled: boolean;
  username: string;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface RegisterUser {
  id?: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  type: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
