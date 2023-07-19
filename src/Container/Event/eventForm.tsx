import React, { ChangeEvent, FormEvent } from "react"
import { Col, Row } from "../../Components"
import { Button, FormControl, MenuItem, TextField } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EVENT, EVENTFilter } from "../../Interface/eventInterface";
import dayjs from "dayjs";


const eventTypes = [
    { label: "Select an event type", value: "" },
    { label: "Sports", value: "sports" },
    { label: "Music", value: "music" },
    { label: "General", value: "general" },
    { label: "Children", value: "children" },
    { label: "School", value: "school" },
]

interface IProps {
    eventData: EVENT
    handleChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void
    handleChangeDate: (name: "startDate" | "endDate", date: any) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    handleReset: () => void
    eventDataErrorMsgs: EVENTFilter
}

export const EventForm: React.FC<IProps> = ({ eventData, handleChange, handleChangeDate, handleReset, handleSubmit, eventDataErrorMsgs }) => {
    {console.log(eventDataErrorMsgs)}

    return (
        <>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>{`${eventData?.id ? "Update" : " Add"} Event`}</h1>
                <Row>
                    <Col sx={6}>
                        <FormControl>
                            <TextField
                                label="Event Name"
                                type="text"
                                name="name"
                                value={eventData.name}
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(eventDataErrorMsgs?.name)}
                                helperText={eventDataErrorMsgs?.name}
                            />
                        </FormControl>
                    </Col>
                    <Col sx={6}>
                        <FormControl>
                            <TextField
                                select
                                label="Select an Event Type"
                                name="type"
                                value={eventData.type}
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(eventDataErrorMsgs?.type)}
                                helperText={eventDataErrorMsgs?.type}
                            >
                                {eventTypes.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Col>

                </Row>
                <Row>
                    <Col sx={12}>
                        <FormControl>
                            <TextField
                                label="Event Description"
                                multiline
                                rows={2}
                                type="text"
                                name="description"
                                value={eventData.description}
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(eventDataErrorMsgs?.description)}
                                helperText={eventDataErrorMsgs?.description}
                            />
                        </FormControl>
                    </Col>
                </Row>

                <Row>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <Col sx={6}>
                                <FormControl className={`${eventDataErrorMsgs?.startDate ? "error" : "primary"}`}>
                                    <DatePicker
                                        label="Event Start Date"
                                        value={dayjs(eventData.startDate)}
                                        onChange={(date) => handleChangeDate("startDate", date)}
                                    />
                                    <span>{eventDataErrorMsgs?.startDate}</span>

                                </FormControl>
                            </Col>
                            <Col sx={6}>
                                <FormControl className={`${eventDataErrorMsgs?.endDate ? "error" : "primary"}`}>
                                    <DatePicker
                                        label="Event End Date"
                                        minDate={dayjs(new Date(eventData?.startDate))}
                                        value={dayjs(eventData?.endDate)}
                                        onChange={(date) => handleChangeDate("endDate", date)}
                                    />
                                    <span>{eventDataErrorMsgs?.endDate}</span>
                                </FormControl>
                            </Col>
                        </DemoContainer>
                    </LocalizationProvider>

                </Row>

                <Row>
                    <Col sx={12}>
                        <FormControl>
                            <TextField
                                label="Event Organisation"
                                type="text"
                                name="organisation"
                                value={eventData.organisation}
                                onChange={handleChange}
                                variant="standard"
                                error={Boolean(eventDataErrorMsgs?.organisation)}
                                helperText={eventDataErrorMsgs?.organisation}
                            />
                        </FormControl>
                    </Col>
                </Row>

                <Row>
                    <Col sx={6}>
                        <FormControl>
                            <TextField
                                label="Event Handled By"
                                type="text"
                                name="handledBy"
                                value={eventData.handledBy}
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(eventDataErrorMsgs?.handledBy)}
                                helperText={eventDataErrorMsgs?.handledBy}
                            />
                        </FormControl>
                    </Col>

                    <Col sx={6}>
                        <FormControl>
                            <TextField
                                label="Total Number Of Sub Events"
                                type="number"
                                name="subEvents"
                                value={eventData.subEvents}
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(eventDataErrorMsgs?.subEvents)}
                                helperText={eventDataErrorMsgs?.subEvents}
                            />
                        </FormControl>
                    </Col>

                </Row>

                <Row>
                    <Col sx={6}>
                        <Button disabled={Boolean(eventData?.id)} type="reset" variant="outlined">Reset</Button>
                    </Col>
                    <Col sx={6}>
                        <Button type="submit" variant="contained">{eventData?.id ? "Update" : "Submit"}</Button>
                    </Col>
                </Row>
            </form>
        </>
    )
}

