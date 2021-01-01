import { parseISO, format } from "date-fns"

export default function Date({ dateString }) {
    const foo = parseISO(dateString)

    return <time dateTime={dateString}>{format(foo, "LLLL d, yyyy")}</time>
}