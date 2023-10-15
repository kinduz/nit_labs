const initialState = {
    games: null,
}

const ADD_GAMES = 'ADD_GAMES'

export const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GAMES:
            return {...state, games: action.payload}
        default:
            return state;
    }
}

export const addGamesAction = (payload) => {
    return {type: ADD_GAMES, payload}
}