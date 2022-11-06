import { Response } from './response';

export interface LoginResponse extends Response {
   access_token: string;
}