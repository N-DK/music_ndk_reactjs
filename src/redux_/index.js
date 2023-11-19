const initialState = {
    data: '',
    isPlaying: false,
    isActive: -1,
    currSong: '',
    songs: [],
};

const SET_DATA = 'set_data';
const SET_PLAYING = 'set_playing';
const SET_CURRSONG = 'set_currSong';
const SET_ACTIVE = 'set_active';
const SET_SONGS = 'set_songs';

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

const setCurrAudio = (payload) => {
    return {
        type: SET_CURRSONG,
        payload,
    };
};

const setActive = (payload) => {
    return {
        type: SET_ACTIVE,
        payload,
    };
};

const setListSongs = (payload) => {
    return {
        type: SET_SONGS,
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
        case SET_CURRSONG:
            newState = {
                ...state,
                currSong: action.payload,
            };
            break;
        case SET_ACTIVE:
            newState = {
                ...state,
                isActive: action.payload,
            };
            break;
        case SET_SONGS:
            newState = {
                ...state,
                songs: action.payload,
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export { reducer, setData, setPlaying, setCurrAudio, setActive, setListSongs };
