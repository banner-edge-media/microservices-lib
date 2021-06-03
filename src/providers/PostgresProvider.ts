import {Pool} from 'pg';

export default class PostgresProvider {

    static pool: Pool;

    static async connect(connectionString: string) {
        this.pool = new Pool({
            connectionString,
            ssl: connectionString.includes("ondigitalocean") || connectionString.includes("amazon") ? {
                rejectUnauthorized: false
            } : undefined
        })

        await this.pool.connect();
        console.log('Postgres connected');
    }

    static async query(sql: string, params?: any[]) {
        const results = await this.pool.query(sql, params);
        return results.rows;
    }
}
