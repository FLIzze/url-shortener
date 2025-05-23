import type { UrlMapResponse } from "$lib/types";
import postgres, { type RowList } from "postgres";
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
                        original_url text not null,
                        nbr_use smallint,
                        expiration date
                );
        `;
}

export async function insertUrlMapping(
        url: string,
        shortened_url: string,
        nbr_use?: number,
        expiration_date?: Date
) {
        await sql`
        INSERT INTO urlMap (
            original_url, shortened_url, nbr_use, expiration
        ) VALUES (
            ${url}, ${shortened_url}, ${nbr_use ?? null}, ${expiration_date ?? null})
    `;
}

export async function getUrlMapping(url: string): Promise<UrlMapResponse> {
        const result = await sql`
                SELECT original_url, nbr_use, expiration 
                FROM urlMap WHERE shortened_url = ${url};
        `;

        return result[0];
}

export async function handleNbrUse(url: string, nbr: number) {
        if (nbr === 1) {
                await sql`
                        DELETE FROM urlMap 
                        WHERE shortened_url = ${url};
                `;
        } else {
                await sql`
                        UPDATE urlMap 
                        SET nbr_use = nbr_use - 1
                        WHERE shortened_url = ${url};
                `;
        }

}

export default sql;
