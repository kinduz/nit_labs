const initialState = {
    itTitle: false,
    isMultiplayer: false,
    dateFrom: '',
    dateTo: '',
    rating: '',
}

const ADD_FILTERS = 'ADD_FILTERS'

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTERS:
            return {...state, isTitle: action.payload.isTitle, isMultiplayer: action.payload.isMultiplayer, dateFrom: action.payload.dateFrom, dateTo: action.payload.dateTo, rating: action.payload.rating}
        default:
            return state;
    }
}

export const addFiltersAction = (isTitle, isMultiplayer, dateFrom, dateTo, rating) => {
    const data = { isTitle, isMultiplayer, dateFrom, dateTo, rating };
    return {type: ADD_FILTERS, payload: data}
}