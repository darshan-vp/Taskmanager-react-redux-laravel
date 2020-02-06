import {
    INPUT_PROJECT_NAME,
    INPUT_PROJECT_DESCRIPTION,
    PROJECT_CREATED_SUCCESSFULLY,
    PROJECT_VALIDATION_ERRORS
} from "../constants";

export default function inputChangeReducer(
    state = { name: "", description: "", errors: [] },
    action
) {
    switch (action.type) {
        case INPUT_PROJECT_NAME:
            return {
                ...state,
                name: action.payload
            };
        case INPUT_PROJECT_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case PROJECT_CREATED_SUCCESSFULLY:
            return {
                name: "",
                description: "",
                errors: []
            };
        case PROJECT_VALIDATION_ERRORS:
            return { ...state, errors: action.payload };

        default:
            return state;
    }
}
