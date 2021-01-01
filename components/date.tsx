import { parseISO, format } from "date-fns"

export default function Date({ dateString }: { dateString: string }) {
    const foo = parseISO(dateString)

    return <time dateTime={dateString}>{format(foo, "LLLL d, yyyy")}</time>
}