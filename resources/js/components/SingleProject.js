import axios from "axios";
import React, { Component } from "react";
import { mapStateToProps, mapDispatchToProps } from "../actions/taskList";
import { connect } from "react-redux";

class SingleProject extends Component {
    constructor(props) {
        super(props);
        this.handleAddNewTask = this.handleAddNewTask.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(
            this
        );
    }

    componentDidMount() {
        // Get projectId from URL
        console.log("componentDidMount");
        const projectId = this.props.match.params.id;
        this.props.getTasks(projectId);
    }

    // Add new task in project
    handleAddNewTask(event) {
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
    }

    hasErrorFor(field) {
        return !!this.props.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            );
        }
    }

    handleMarkProjectAsCompleted() {
        const { history } = this.props;

        axios
            .put(`/api/projects/${this.props.project.id}`)
            .then(response => history.push("/"));
    }

    handleMarkTaskAsCompleted(taskId) {
        axios.put(`/api/tasks/${taskId}`).then(response => {
            this.props.markTaskAsCompleted(taskId);
        });
    }

    render() {
        const { project, tasks } = this.props;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <strong>{project.name}</strong>
                            </div>

                            <div className="card-body">
                                <p>{project.description}</p>
                                {/* Button to mark project as completed */}
                                <button
                                    className="btn btn-primary btn-sm"
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
                                            className={`form-control ${
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
                                            <button className="btn btn-success">
                                                Add
                                            </button>
                                        </div>

                                        {this.renderErrorFor("title")}
                                    </div>
                                </form>
                                {/* Display project's current tasks */}
                                <ul className="list-group mt-3">
                                    {tasks.map(task => (
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            key={task.id}
                                        >
                                            {task.title}
                                            {/* Button to mark task as completed */}
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={this.handleMarkTaskAsCompleted.bind(
                                                    this,
                                                    task.id
                                                )}
                                            >
                                                Mark as completed
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
