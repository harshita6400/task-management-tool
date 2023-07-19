import { EVENT, EVENTFilter } from "../Interface/eventInterface"


const checkRequired = (data: EVENTFilter | EVENT) => {
    let errors = {}
    let valid = true
    Object.keys(data).forEach(key => {
        const value = data[key as keyof EVENT]
        if (!(value || value === 0)) {
            errors = { ...errors, [key]: `Please enter ${key}` }
            valid = false
        } else errors = { ...errors, [key]: "" }
    })
    return { valid, errors }
}

export const eventValidations = (data: EVENTFilter | EVENT) => {
    let isValid = true
    let errorMsgs = {}
    const { valid, errors } = checkRequired(data)
    isValid = valid
    errorMsgs = { ...errors }
    return { isValid, errorMsgs }
}
