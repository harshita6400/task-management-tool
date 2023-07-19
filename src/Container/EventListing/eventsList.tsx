import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, styled, tableCellClasses } from "@mui/material"
import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EVENT, EVENTFilter, EventSliceInitialState, SORT } from "../../Interface/eventInterface";
import { RootState } from "../../Redux/app/store";
import { SortIcon } from "./sortIcon";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Swal from "sweetalert2";
import { deleteEventReducer } from "../../Redux/reduxSlice/eventDataSlice";
import { useNavigate } from "react-router-dom";
import { AddEVENT } from "../../Routes/routeConstents";
import { filterRows, paginateRows, sortRows } from "../../Utils/tableUtils";
import './eventList.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export const EventsList: React.FC = () => {
    const eventsData: EVENT[] = useSelector((data: any) => data.eventDataSlice.eventsData)
    const dispatch = useDispatch()
    const navigateto = useNavigate();

    const [activePage, setActivePage] = useState(0)
    const [filters, setFilters] = useState<EVENTFilter>({})
    const [sort, setSort] = useState<SORT>({ order: 'asc', orderBy: 'id' })
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const filteredRows: EVENT[] = useMemo(() => filterRows(eventsData, filters), [eventsData, filters])


    const sortedRows: EVENT[] = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])

    const calculatedRows: EVENT[] = paginateRows(sortedRows, activePage, rowsPerPage)


    const handleSearch = (value: string, accessor: keyof typeof filters) => {
        setActivePage(0)
        if (value) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [accessor]: value,
            }))
        } else {
            setFilters((prevFilters) => {
                const updatedFilters = { ...prevFilters }
                delete updatedFilters[accessor]
                return updatedFilters
            })
        }
    }

    const handleSort = (cell: keyof EVENT) => {
        setActivePage(0)
        setSort((prevSort) => {
            const updatedSort: SORT = {
                order: prevSort.order === 'asc' && prevSort.orderBy === cell ? 'des' : 'asc',
                orderBy: cell,
            }
            return updatedSort
        })
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setActivePage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setActivePage(0);
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            icon: 'warning',
            text: 'Are you sure you want to delete it.',
            showCancelButton: true,
            confirmButtonText: 'delete',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteEventReducer(id))
            }
        })
    }

    return (
        <>
        <div className="event-list">
            <h1>All Event</h1>

            <TableContainer className="table-container" component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            {
                                Object.keys(eventsData[0]).map((cell, i: number) => {
                                    if (cell !== "id") {
                                        return (
                                            <StyledTableCell key={i} >
                                                <p>{cell.toLocaleLowerCase()}</p>
                                            </StyledTableCell>
                                        )
                                    }
                                })
                            }
                            <StyledTableCell>Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell> </StyledTableCell>
                            {
                                Object.keys(eventsData[0]).map((cell, i: number) => {
                                    if (cell !== "id") {
                                        return (
                                            <StyledTableCell key={i} >
                                                {
                                                    cell.includes("Date") || cell.includes("At")
                                                        ? <SortIcon
                                                            cell={cell as keyof EVENT}
                                                            sort={sort}
                                                            handleSort={handleSort}
                                                        />
                                                        : <TextField
                                                            label="Search"
                                                            type="search"
                                                            onChange={(event) => handleSearch(event.target.value, cell as keyof EVENT)}
                                                        />
                                                }
                                            </StyledTableCell>
                                        )
                                    }
                                })
                            }
                            <StyledTableCell> </StyledTableCell>

                        </StyledTableRow>
                        {
                            calculatedRows?.map((row, index: number) => (
                                <StyledTableRow key={index}>

                                    <StyledTableCell>{index + 1}</StyledTableCell>

                                    {
                                        Object.keys(row).map((cell, i: number) => {
                                            if (cell !== "id") {
                                                if (typeof (row[cell as keyof EVENT]) === "string") {
                                                    return (
                                                        <>
                                                            <StyledTableCell key={Number(`${row.id}${i}`)}>{row[cell as keyof EVENT] as string}</StyledTableCell>
                                                        </>
                                                    )
                                                } else {
                                                    const date = new Date(row[cell as keyof EVENT] as Date).toDateString().split(" ")
                                                    date.splice(0, 1)
                                                    return (
                                                        <>
                                                            <StyledTableCell key={Number(`${row.id}${i}`)}>{date.join(" ")}</StyledTableCell>
                                                        </>
                                                    )
                                                }
                                            }

                                        })
                                    }

                                    <StyledTableCell>
                                        <CreateOutlinedIcon onClick={() => navigateto(`${AddEVENT}/${row.id}`)} />
                                        <DeleteIcon onClick={() => handleDelete(row.id || 0)} />
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </TableContainer >
            {
                calculatedRows?.length
                    ? <>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={activePage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                    : <>No-events</>
            }
        </div>
        </>
    )
}

