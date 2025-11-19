import {Alias} from "@/types";
import getCollection, {URL_COLLECTION} from "@/db";

export default async function findAlias(alias: string): Promise<string | null> {
    console.log("Finding url");

    const collection = await getCollection(URL_COLLECTION);
    const record = await collection.findOne({alias});

    if (!record) {
        return null;       // alias not found
    }

    return record.url;     // return the long URL
}