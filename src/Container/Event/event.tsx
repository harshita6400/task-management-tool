import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"

import "./event.scss"
import { EVENT, EVENTFilter } from "../../Interface/eventInterface";
import { useDispatch, useSelector } from "react-redux";
import { addEventReducer, updateEventReducer } from "../../Redux/reduxSlice/eventDataSlice";
import { EventForm } from "./eventForm";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { eventValidations } from "../../Utils/validations";


const initialState: EVENT = {
    name: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    handledBy: "",
    organisation: "",
    subEvents: ""
}

export const Event: React.FC = () => {
    const dispatch = useDispatch()
    const { eventId } = useParams();
    const eventsData: EVENT[] = useSelector((data: any) => data.eventDataSlice.eventsData)

    const [eventData, setEventData] = useState<EVENT>(initialState)
    const [eventDataErrorMsgs, setEventDataErrorMsgs] = useState<EVENTFilter>({})

    useEffect(() => {
        if (eventId) {
            const event = eventsData.find(item => item.id === Number(eventId))
            if (event) setEventData(event)
        }
    }, [eventId])

    const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        const newdata = { [name]: value }
        const { errorMsgs } = eventValidations(newdata)
        setEventData({ ...eventData, ...newdata })
        setEventDataErrorMsgs({ ...eventDataErrorMsgs, ...errorMsgs })
    }

    const handleChangeDate = (name: "startDate" | "endDate", dateValue: { $d: Date }) => {
        const date = dateValue.$d || ""
        const newdata = { [name]: date }
        const { errorMsgs } = eventValidations(newdata)
        setEventData({ ...eventData, ...newdata })
        setEventDataErrorMsgs({ ...eventDataErrorMsgs, ...errorMsgs })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const { isValid, errorMsgs } = eventValidations(eventData)
            setEventDataErrorMsgs({ ...eventDataErrorMsgs, ...errorMsgs })
            if (!isValid) return

            if (!eventData.id) {
                dispatch(addEventReducer(eventData))
                setEventData(initialState)
            } else dispatch(updateEventReducer(eventData))
            Swal.fire({
                icon: 'success',
                text: `Event ${eventData.id ? "updated" : "added"} successfully`,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = () => {
        setEventData(initialState)
        setEventDataErrorMsgs({})
    }

    return (
        <>
            <div className="event-container">
                <EventForm
                    eventData={eventData}
                    handleChange={handleChange}
                    handleChangeDate={handleChangeDate}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    eventDataErrorMsgs={eventDataErrorMsgs}
                />
            </div>
        </>
    )
}

