
type TYPE = "sports" | "music" | "general" | "children" | "school" | ""

export interface EVENT {
    id?: number
    name: string
    type: TYPE
    startDate: Date | string
    endDate: Date | string
    description: string
    handledBy: string
    organisation: string
    subEvents: string
    createdAt?: Date
    updatedAt?: Date
}

export interface EVENTFilter {
    id?: number
    name?: string
    type?: TYPE
    startDate?: string
    endDate?: string
    description?: string
    handledBy?: string
    organisation?: string
    subEvents?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface EventSliceInitialState {
    eventsData: Array<EVENT>
    length: number
    status: "loading" | "idel" | "error",
}

export interface SORT {
    order: "asc" | "des"
    orderBy: keyof EVENT
}
