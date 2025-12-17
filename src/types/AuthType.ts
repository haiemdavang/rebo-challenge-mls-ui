import type { BaseUserDto } from './UserType';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: BaseUserDto;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}
