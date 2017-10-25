export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export const APPLICATION_INIT = 'APPLICATION_INIT'
export const API_LOADING = 'API_LOADING'

export const setApiLoading = (payload) => ({
    type: API_LOADING,
    value: payload
});