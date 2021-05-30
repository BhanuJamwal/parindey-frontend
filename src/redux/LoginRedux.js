import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    loginSuccess: ['response'],
    loginFailure: ['error'],
    loginRequest: ['request'],

    resetIsLoggedIn: ['IsLoggedIn']

})

export const loginTypes = Types
export default Creators

export const INITIAL_STATE = {
    error: null,
    isLoggedIn: false,
    data: null
}

export const loginRequest = (state) => {
    return {
        ...state
    }
}

export const loginSuccess = (state, action) => {
    return {
        ...state,
        data: action.response.data,
        isLoggedIn: true,
        error: null
    }
}

export const loginFailure = (state, action) => {
    return {
        ...state,
        error: action.error
    }
}

export const resetIsLoggedIn = (state) => {
    return {
        ...state,
        isLoggedIn: false
    }
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_FAILURE]: loginFailure,

    [Types.RESET_IS_LOGGED_IN]: resetIsLoggedIn
})
