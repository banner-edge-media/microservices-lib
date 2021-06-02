import UserRead from '../objects/UserRead';
export default class AccessService {
    static remoteSelf(token: string): Promise<UserRead | undefined>;
}
