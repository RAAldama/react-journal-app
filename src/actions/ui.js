import { types } from "../types/types"

export const setError = ( error ) => {
    return {
        type: types.uiSetError,
        payload: error
    }
};

export const removeError = () => {
    return {
        type: types.uiRemoveError,
    }
};