import UserRead from '../objects/UserRead';
import fetch from 'node-fetch';

export default class AccessService {
    public static async remoteSelf(token: string): Promise<UserRead | undefined> {
        const query = `
        {
          self {
            id
            first
            last
            email
          }
        }
        `;
        const response = await fetch(process.env.API_URL, {
            method: "POST",
            body: JSON.stringify({query}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
        });

        if (response.status === 200) {
            const json = await response.json();
            if (json.data && json.data.self) {
                return json.data.self;
            }
        }

        return null;
    }
}
