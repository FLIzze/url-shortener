import { insertUrlMapping } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
        const { url } = await request.json();

        try {
                // await createTable();
                await insertUrlMapping(url);
        } catch (error) {
                console.error(`Error inserting : ${error}`);
                return json({ status: 500 });
        }

        return json({ status: 200 });
};
