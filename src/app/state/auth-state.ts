import { AuthInfo } from './../api/model/auth-info';
export class AuthState {
    constructor(
        public isAuthenticated: boolean,
        public accessToken: string,
        public name: string,
        public role: 'ADMIN' | 'DOORMAN' | 'RESIDENT' | '',
        public email: string
    ){}
}