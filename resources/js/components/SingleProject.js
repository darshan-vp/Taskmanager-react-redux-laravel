import axios from "axios";
import React, { Component } from "react";
import { mapStateToProps, mapDispatchToProps } from "../actions/taskList";
import { connect } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "../spinner";
import { withTheme } from "styled-components";

class SingleProject extends Component {
    componentDidMount() {
        // Get projectId from URL
        const projectId = this.props.match.params.id;
        // Show loader and Fetch Task
        this.props.initialLoadingAsync(projectId);
    }

    // Add new task in project
    handleAddNewTask = event => {
        event.preventDefault();
        const task = {
            title: this.props.title,
            project_id: this.props.project.id
        };

        axios
            .post("/api/tasks", task)
            .then(response => {
                this.props.addTask(response.data);
            })
            .catch(error => {
                this.props.addTaskErrors(error.response.data.errors);
            });
    };

    hasErrorFor = field => {
        return !!this.props.errors[field];
    };

    renderErrorFor = field => {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            );
        }
    };

    handleMarkProjectAsCompleted = () => {
        const { history } = this.props;

        axios
            .put(`/api/projects/${this.props.project.id}`)
            .then(response => history.push("/"));
    };

    handleMarkTaskAsCompleted = taskId => {
        axios.put(`/api/tasks/${taskId}`).then(response => {
            this.props.markTaskAsCompleted(taskId);
        });
    };

    render() {
        const { project, tasks, loading } = this.props;
        let bg = "bg-light";
        let text = "";
        if (this.props.theme.mode === "dark") {
            bg = "bg-dark";
            text = "text-white";
        }

        let loadingSpinner = loading ? (
            <div style={{ margin: "0 auto" }}>
                <Spinner skin={this.props.theme.skin} />
            </div>
        ) : (
            tasks.map(task => (
                <li
                    className={`list-group-item d-flex justify-content-between align-items-center ${bg} ${text}`}
                    key={task.id}
                >
                    {task.title}
                    {/* Button to mark task as completed */}
                    <button
                        className={`btn btn-sm btn-${this.props.theme.skin}`}
                        onClick={this.handleMarkTaskAsCompleted.bind(
                            this,
                            task.id
                        )}
                    >
                        Mark as completed
                    </button>
                </li>
            ))
        );

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div
                            className={`card border-${this.props.theme.skin} ${
                                this.props.theme.mode === "light"
                                    ? "bg-light"
                                    : "bg-dark text-white"
                            }`}
                        >
                            <div className="card-header">
                                <strong>{project.name}</strong>
                                <Link to="/" className="float-right">
                                    <FaArrowLeft
                                        className={`text-${this.props.theme.skin}`}
                                    />
                                </Link>
                            </div>

                            <div className="card-body">
                                <p>{project.description}</p>
                                {/* Button to mark project as completed */}
                                <button
                                    className={`btn btn-${this.props.theme.skin} btn-sm`}
                                    onClick={this.handleMarkProjectAsCompleted}
                                >
                                    Mark as completed
                                </button>

                                <hr />
                                {/* Form to add tasks in project */}
                                <form onSubmit={this.handleAddNewTask}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${bg} ${text} border-${
                                                this.props.theme.skin
                                            } ${
                                                this.hasErrorFor("title")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Task title"
                                            value={this.props.title}
                                            onChange={e => {
                                                this.props.inputTask(
                                                    e.target.value
                                                );
                                            }}
                                        />

                                        <div className="input-group-append">
                                            <button
                                                className={`btn btn-${this.props.theme.skin}`}
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {this.renderErrorFor("title")}
                                    </div>
                                </form>
                                {/* Display project's current tasks */}

                                <ul className="list-group mt-3">
                                    {loadingSpinner}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(SingleProject));
