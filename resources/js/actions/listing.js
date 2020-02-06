import axios from "axios";
import {
    LIST_PROJECTS_BEGIN,
    LIST_PROJECTS_SUCCESS,
    LIST_PROJECTS_ERROR
} from "../constants";

export const listAllProjects = projects => {
    return {
        type: LIST_PROJECTS_SUCCESS,
        payload: projects
    };
};

export const initialLoading = () => {
    return {
        type: LIST_PROJECTS_BEGIN
    };
};

export const listAllProjectsError = error => {
    return {
        type: LIST_PROJECTS_ERROR,
        payload: error
    };
};

// Action creator which returns another function instead of action object
// This function receives redux dispatch and getState functions as argument
// Which can be used to dispatch another actions
// This is possible becuase of redux-thunk
const fetchProjectsAsyc = () => {
    return (dispatch, getState) => {
        // Show loading spinner first
        dispatch(initialLoading());
        // console.log(getState());
        // Load project listing after 2 seconds to show loading screen
        setTimeout(() => {
            axios
                .get("/api/projects")
                .then(response => {
                    dispatch(listAllProjects(response.data));
                })
                .catch(error => {
                    // handle error
                    dispatch(listAllProjectsError(error));
                });
        }, 2000);
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        // Dispatch action
        fetchProjects: () => {
            // Show loading spinner first
            dispatch(initialLoading());

            // Load project listing after 2 seconds to show loading screen
            setTimeout(() => {
                axios
                    .get("/api/projects")
                    .then(response => {
                        dispatch(listAllProjects(response.data));
                    })
                    .catch(error => {
                        // handle error
                        dispatch(listAllProjectsError(error));
                    });
            }, 2000);
        },

        fetchProjectsAsyc: () => {
            dispatch(fetchProjectsAsyc());
        }
    };
};

// Send state data to component to use as props
export const mapStateToProps = ({ listProject }) => {
    return {
        projects: listProject.projects,
        loading: listProject.loading,
        error: listProject.error
    };
};
