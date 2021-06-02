import { Pool } from 'pg';
export default class PostgresProvider {
    static pool: Pool;
    static connect(connectionString: string): Promise<void>;
    static query(sql: string, params?: any[]): Promise<any>;
}
