import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { mapStateToProps, mapDispatchToProps } from "../actions/projectCreate";
import { withTheme } from "styled-components";

class NewProject extends Component {
    componentDidMount() {
        this.props.loadForm();
    }
    /**
     * Post Form data with ajax
     */

    handleCreateNewProject = event => {
        event.preventDefault();

        const { history } = this.props;

        const project = {
            name: this.props.name,
            description: this.props.description
        };

        axios
            .post("/api/projects", project)
            .then(response => {
                // dispatch project created success action
                this.props.projectCreateSuccess();
                // redirect to the homepage
                history.push("/");
            })
            // If validation error occurs then we will set them in state
            // So that later we can use them in display in UI
            .catch(error => {
                // dipatch validation error action with errors
                this.props.projectValidationErrors(error.response.data.errors);
            });
    };

    // check if field has error or not
    hasErrorFor = field => {
        return !!this.props.errors[field];
    };

    // Display error message in UI if validation error occured
    renderErrorFor = field => {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            );
        }
    };

    render() {
        let bg = "bg-light";
        let text = "";
        if (this.props.theme.mode === "dark") {
            bg = "bg-dark";
            text = "text-white";
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div
                            className={`card border-${this.props.theme.skin} ${bg} ${text}`}
                        >
                            <div className="card-header">
                                <strong>Create new project</strong>
                                <Link to="/" className="float-right">
                                    <FaArrowLeft
                                        className={`text-${this.props.theme.skin}`}
                                    />
                                </Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewProject}>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Project name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control border-${
                                                this.props.theme.skin
                                            } ${bg} ${text} ${
                                                this.hasErrorFor("name")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="name"
                                            value={this.props.name}
                                            onChange={e =>
                                                this.props.changeNameState(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {this.renderErrorFor("name")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">
                                            Project description
                                        </label>
                                        <textarea
                                            id="description"
                                            className={`form-control border-${
                                                this.props.theme.skin
                                            } ${bg} ${text} ${
                                                this.hasErrorFor("description")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="description"
                                            rows="10"
                                            value={this.props.description}
                                            onChange={e =>
                                                this.props.changeDescState(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {this.renderErrorFor("description")}
                                    </div>
                                    <button
                                        className={`btn btn-${this.props.theme.skin}`}
                                    >
                                        Create
                                    </button>
                                </form>
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
)(withTheme(NewProject));
