import UserRead from './UserRead';

export default interface Context {
    user: UserRead;
    userAgent: string;
    ip: string;
    token: string;
}
