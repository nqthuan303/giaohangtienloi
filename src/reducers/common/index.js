import { API_LOADING } from '../../actions'

export const initialState = {
    apiLoading: false
}

export function common (state = initialState, action) {
    switch (action.type) {
        case API_LOADING:
            return {...state, apiLoading: action.value}
        default:
            return state
    }
}
