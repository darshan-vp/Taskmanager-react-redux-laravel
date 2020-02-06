import {
    GET_TASKS,
    INPUT_TASK,
    ADD_TASK,
    ADD_TASK_VALIDATION_ERRORS,
    MARK_TASK_COMPLETE
} from "../constants";

const initialState = {
    project: {},
    tasks: [],
    title: "",
    errors: []
};

const listTasks = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                project: action.payload.project,
                tasks: action.payload.tasks
            };
        case INPUT_TASK:
            return {
                ...state,
                title: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                title: "",
                tasks: state.tasks.concat(action.payload)
            };
        case ADD_TASK_VALIDATION_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case MARK_TASK_COMPLETE:
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return task.id !== action.payload;
                })
            };
        default:
            return state;
    }
};

export default listTasks;
