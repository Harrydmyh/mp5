import ShortenForm from "@/components/ShortenForm";

export default function Home() {
    return (
        <div
            className="w-[90%] bg-blue-200 shadow-lg flex flex-col items-center justify-center m-auto p-10 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-blue-800 text-center">
                URL Shortener
            </h1>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                Shortening arbitrary url with your chosen aliases
            </h2>
            <ShortenForm/>
        </div>
    )
}
