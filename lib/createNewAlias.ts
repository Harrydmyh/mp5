"use server";
import {Alias} from "@/types";
import getCollection from "@/db";
import {URL_COLLECTION} from "@/db";

export default async function createNewAlias(url: string, alias: string): Promise<Alias> {
    console.log("Creating new alias");
    const a = {
        url: url,
        alias: alias,
    };

    const collection = await getCollection(URL_COLLECTION);
    const existing = await collection.findOne({ alias: alias });
    if (existing) {
        return { error: "This alias already exists." };
    }
    const res = await collection.insertOne({...a})
    if (!res.acknowledged) {
        return { error: "Database insert failed." };
    }
    return { ...a, id: res.insertedId.toHexString() };
}