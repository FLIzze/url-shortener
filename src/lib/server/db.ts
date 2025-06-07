import dotenv from 'dotenv';
dotenv.config();

import type { UrlMapResponse } from "$lib/types";
import postgres from "postgres";

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const sql = postgres({
        host: HOST,
        port: Number(PORT),
        database: DATABASE,
        username: USERNAME,
        password: PASSWORD,
});

export async function createTable() {
        await sql`
                CREATE TABLE IF NOT EXISTS urlMap(
                        id SERIAL PRIMARY KEY,
                        shortened_url varchar(6) not null,
                        original_url text not null,
                        nbr_use smallint,
                );
        `;
}

export async function insertUrlMapping(
        url: string,
        shortened_url: string,
) {
        await sql`
        INSERT INTO urlMap (
            original_url, shortened_url, nbr_use
        ) VALUES (
            ${url}, ${shortened_url}, 0
        );
    `;
}

export async function getUrlMapping(url: string): Promise<UrlMapResponse> {
        const result = await sql<UrlMapResponse[]>`
                SELECT original_url, nbr_use
                FROM urlMap WHERE shortened_url = ${url};
        `;

        return result[0];
}

export async function handleNbrUse(url: string) {
        await sql`
                UPDATE urlMap 
                SET nbr_use = nbr_use + 1
                WHERE shortened_url = ${url};
        `;

}

export default sql;
