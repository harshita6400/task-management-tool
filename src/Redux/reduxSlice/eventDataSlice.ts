import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EVENT, EventSliceInitialState } from "../../Interface/eventInterface";


const initialState: EventSliceInitialState = {
    eventsData: [],
    length: 0,
    status: "idel",
}

const eventDataSlice: any = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEventReducer: (state, action: PayloadAction<EVENT>) => {
            const id = state.length + 1
            state.length += state.length
            state.eventsData.unshift({ ...action?.payload, ["id"]: id, ["createdAt"]: new Date(), ["updatedAt"]: new Date() })
        },
        updateEventReducer: (state, action: PayloadAction<EVENT>) => {
            const index = state.eventsData.findIndex(item => item.id === action?.payload?.id)
            if (index !== -1) state.eventsData.splice(index, 1, { ...action?.payload, ["updatedAt"]: new Date() })
        },
        deleteEventReducer: (state, action: PayloadAction<number>) => {
            state.eventsData.splice(action.payload, 1)
        }
    },
})

export const { addEventReducer, updateEventReducer, deleteEventReducer } = eventDataSlice.actions;

export default eventDataSlice.reducer