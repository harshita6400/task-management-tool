import React from "react"
import { EVENT, SORT } from "../../Interface/eventInterface"


interface IProps {
    cell: keyof EVENT
    sort: SORT
    handleSort: (cell: keyof EVENT) => void
}

export const SortIcon: React.FC<IProps> = ({ cell, sort, handleSort }) => {
    return (
        <span onClick={() => handleSort(cell as keyof EVENT)}>
            Sort &nbsp;
            {
                cell === sort.orderBy
                    ? sort.order === 'asc'
                        ? <>⬆️</>
                        : <>⬇️</>
                    : <>↕️</>
            }
        </span>
    )
}
