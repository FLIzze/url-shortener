import { getUrlMapping, handleNbrUse } from "$lib/server/db";
import type { UrlMapResponse } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ request }: RequestEvent) {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const shortened_url = pathname.slice(1);
        let og_url = "";

        try {
                const { original_url, nbr_use }: UrlMapResponse = await getUrlMapping(shortened_url);
                og_url = original_url;

                if (nbr_use > 0) {
                        handleNbrUse(shortened_url, nbr_use);
                }

        } catch (error) {
                console.error(`Error getting : ${error}`);
                return json({ status: 500, message: "Error getting URL", original_url: "" });
        }

        return json({ status: 200, message: "Fetched URL successfully", original_url: og_url });
};
