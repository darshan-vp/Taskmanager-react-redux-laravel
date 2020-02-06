import {
    INPUT_PROJECT_NAME,
    INPUT_PROJECT_DESCRIPTION,
    PROJECT_CREATED_SUCCESSFULLY,
    PROJECT_VALIDATION_ERRORS,
    LOAD_PROJECT_CREATE_FORM
} from "../constants";

const inputName = value => {
    return {
        type: INPUT_PROJECT_NAME,
        payload: value
    };
};

const loadProjectCreateForm = () => {
    return {
        type: LOAD_PROJECT_CREATE_FORM
    };
};

const projectCreateSuccess = () => {
    return {
        type: PROJECT_CREATED_SUCCESSFULLY
    };
};

const inputDescription = value => {
    return {
        type: INPUT_PROJECT_DESCRIPTION,
        payload: value
    };
};

const projectValidationErrors = errors => {
    return {
        type: PROJECT_VALIDATION_ERRORS,
        payload: errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        loadForm: () => {
            dispatch(loadProjectCreateForm());
        },
        changeNameState: val => {
            dispatch(inputName(val));
        },
        changeDescState: val => {
            dispatch(inputDescription(val));
        },
        projectCreateSuccess: () => {
            dispatch(projectCreateSuccess());
        },
        projectValidationErrors: errors => {
            dispatch(projectValidationErrors(errors));
        }
    };
};

export const mapStateToProps = ({ inputChange }) => inputChange;
