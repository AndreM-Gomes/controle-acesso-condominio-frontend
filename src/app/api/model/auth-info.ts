export interface AuthInfo{
    accessToken: string;
    role: 'ADMIN' | 'RESIDENT' | 'DOORMAN' | '';
    email: string;
    name: string;
}