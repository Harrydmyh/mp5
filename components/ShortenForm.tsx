"use client"
import {useState} from "react";
import createNewAlias from "@/lib/createNewAlias";

export default function ShortenForm() {
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setResult("")

        if (!isValidUrl(url)) {
            setError("The URL you entered is not valid. Please try again.");
            return;
        } else if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
            setError("Invalid alias. Please enter a valid alias.");
            return;
        }
        try {
            setLoading(true);
            const newAlias = await createNewAlias(url, alias);
            if ("error" in newAlias) {
                setError(newAlias.error);
                return;
            }
            setResult(alias)
        } catch (err: any) {
            setError(err.message ?? "Something went wrong.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form
            className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-3 w-full max-w-2xl"
            onSubmit={handleSubmit}
        >
            <p className="font-semibold">Your URL:</p>
            <label htmlFor="url" className="sr-only">Search artworks</label>

            <input
                id="url"
                name="url"
                className="border border-gray-300 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="http://www.example.com/"
                onChange={(e) => {
                    setUrl(e.target.value)
                }}
            />
            <p className="font-semibold">Custom Alias:</p>
            <div className="flex items-center gap-5 max-w-2xl">
                <span className="whitespace-nowrap">https://mp5-teal.vercel.app/</span>

                <label htmlFor="shorten" className="sr-only">Search artworks</label>

                <input
                    id="shorten"
                    name="shorten"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-0"
                    placeholder="Your Alias"
                    onChange={(e) => {
                        setAlias(e.target.value)
                    }}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
            >
                {loading ? "Shortening..." : "Shorten"}
            </button>
            {error && (
                <p className="text-red-600 font-semibold">{error}</p>
            )}
            {result && (
                <div className="mt-4 p-2 border border-gray-300 rounded">
                    <p>Your shortened URL:</p>
                    <div className="flex items-center gap-2">
                        <p className="text-blue-600 font-semibold break-all">
                            https://mp5-teal.vercel.app/{result}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(`https://mp5-teal.vercel.app/${result}`);
                                setCopied(true);
                            }}
                            className="rounded hover:bg-gray-200 font-semibold text-black"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                </div>
            )}
        </form>
    )
}