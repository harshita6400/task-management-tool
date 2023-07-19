import { EVENT, EVENTFilter, SORT } from "../Interface/eventInterface"

export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
}

export function toLowerCase(value?: string | number | Date) {
    if (value !== undefined) {
        return value?.toLocaleString().toLowerCase()
    }
    return value || ""
}

export function filterRows(rows: EVENT[], filters: EVENTFilter) {
    if (isEmpty(filters)) return rows

    return rows.filter((row) => {
        return Object.keys(filters).every((cell) => {
            const value = row[cell as keyof EVENT]
            const searchValue = filters[cell as keyof EVENTFilter]
            return toLowerCase(value).includes(toLowerCase(searchValue))
        })
    })
}

export function sortRows(rows: EVENT[], sort: SORT) {
    const { order, orderBy } = sort

    const newArr = [...rows]
    return newArr.sort((a, b) => {
        if (order === "des") return Number(b[orderBy]) - Number(a[orderBy])
        else return Number(a[orderBy]) - Number(b[orderBy])
    })
}

export function paginateRows(sortedRows: any, activePage: any, rowsPerPage: any) {
    return [...sortedRows].slice(activePage * rowsPerPage, (activePage + 1) * rowsPerPage)
}
