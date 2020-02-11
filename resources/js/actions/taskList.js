import {
    GET_TASKS,
    INPUT_TASK,
    ADD_TASK,
    ADD_TASK_VALIDATION_ERRORS,
    MARK_TASK_COMPLETE,
    INITIAL_LOAD_TASK
} from "../constants";

const getTasksAction = project => {
    return {
        type: GET_TASKS,
        payload: { project, tasks: project.tasks }
    };
};

const inputTaskAction = task => {
    return {
        type: INPUT_TASK,
        payload: task
    };
};

const addTaskAction = task => {
    return {
        type: ADD_TASK,
        payload: task
    };
};

const addTaskValidationErrorsAction = errors => {
    return {
        type: ADD_TASK_VALIDATION_ERRORS,
        payload: errors
    };
};

const markTaskAsCompletedAction = taskId => {
    return {
        type: MARK_TASK_COMPLETE,
        payload: taskId
    };
};

const intialLoadTaskAction = projectId => {
    return (dispatch, getState) => {
        dispatch({ type: INITIAL_LOAD_TASK });

        axios.get(`/api/projects/${projectId}`).then(response => {
            setTimeout(() => {
                dispatch(getTasksAction(response.data));
            }, 2000);
        });
    };
};

export const mapStateToProps = ({ listTasks }) => listTasks;

export const mapDispatchToProps = dispatch => {
    return {
        initialLoadingAsync: projectId => {
            dispatch(intialLoadTaskAction(projectId));
        },
        inputTask: task => {
            dispatch(inputTaskAction(task));
        },
        addTask: task => {
            dispatch(addTaskAction(task));
        },
        addTaskErrors: errors => {
            dispatch(addTaskValidationErrorsAction(errors));
        },
        markTaskAsCompleted: taskId => {
            dispatch(markTaskAsCompletedAction(taskId));
        }
    };
};
