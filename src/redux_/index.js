const initialState = {
    data: '',
    isPlaying: false,
};

const SET_DATA = 'set_data';
const SET_PLAYING = 'set_playing';

const setData = (payload) => {
    return {
        type: SET_DATA,
        payload,
    };
};

const setPlaying = (payload) => {
    return {
        type: SET_PLAYING,
        payload,
    };
};

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_DATA:
            newState = {
                ...state,
                data: action.payload,
            };
            break;
        case SET_PLAYING:
            newState = {
                ...state,
                isPlaying: action.payload,
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export { reducer, setData, setPlaying };
