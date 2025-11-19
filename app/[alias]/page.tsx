import findAlias from "@/lib/findAlias";
import {redirect} from "next/navigation";

export default async function RetrieveURL({params}: { params: { alias: string } }) {
    const alias = params.alias || '';
    console.log(alias);
    const url = await findAlias(alias)
    if (url) {
        redirect(url)
    } else {
        redirect("/")
    }
}