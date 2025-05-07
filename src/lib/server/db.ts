import { generateNewUrl } from "$lib/utils/generateNewUrl";
import postgres from "postgres";

const sql = postgres({
        host: "localhost",
        port: 5432,
        database: "shortener",
        username: "abel",
        password: "1231",
});

export async function createTable() {
        await sql`
                CREATE TABLE IF NOT EXISTS urlMap(
                        id SERIAL PRIMARY KEY,
                        shortened_url varchar(6) not null,
                        original_url text not null
                );
        `;
}

export async function insertUrlMapping(url: string) {
        await sql`
                INSERT INTO urlMap (original_url, shortened_url)
                VALUES (${url}, ${generateNewUrl()})
        `;
}

export default sql;
