import {
    LIST_PROJECTS_BEGIN,
    LIST_PROJECTS_ERROR,
    LIST_PROJECTS_SUCCESS
} from "../constants";

const initialState = {
    projects: [],
    loading: false,
    error: null
};

const listProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_PROJECTS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case LIST_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            };
        case LIST_PROJECTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default listProjectReducer;
