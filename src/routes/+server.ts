import { insertUrlMapping } from "$lib/server/db";
import { isValidHttpUrl } from "$lib/utils/isValidUrl";
import { generateNewUrl } from "$lib/utils/generateNewUrl";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ request }: RequestEvent) {
        const { url, date: expiration_date, nbr_use } = await request.json();

        if (!isValidHttpUrl(url)) {
                console.error(`Url is not valid : ${url}`);
                return json({ status: 422, message: "Url is not valid" });
        }

        const shortened_url = generateNewUrl();

        try {
                // await createTable();
                await insertUrlMapping(url, shortened_url, nbr_use, expiration_date);
        } catch (error) {
                console.error(`Error inserting : ${error}`);
                return json({ status: 500, message: "Internal server error" });
        }

        return json({ status: 200, message: "URL shortened successfully", url: shortened_url });
};
