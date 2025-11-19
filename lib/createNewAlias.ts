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
        throw new Error("Invalid alias: This alias already exists.");
    }
    const res = await collection.insertOne({...a})
    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }
    return { ...a, id: res.insertedId.toHexString() };
}