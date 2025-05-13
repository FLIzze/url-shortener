import { getUrlMapping } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ request }: RequestEvent ) {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const sliced_pathname = pathname.slice(1);

        let original_url = "";

        try {
                original_url = await getUrlMapping(sliced_pathname);
        } catch (error) {
                console.error(`Error getting : ${error}`);
                return json({ status: 500, message: "Error getting URL", original_url: "" });
        }

        return json({ status: 200, message: "Fetched URL successfully", original_url: original_url });
};
