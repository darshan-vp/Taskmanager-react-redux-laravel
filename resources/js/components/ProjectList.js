import React, { Component } from "react";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "../actions/listing";
import { connect } from "react-redux";
import { withTheme } from "styled-components";
import { Spinner } from "../spinner";

// List all projects
class ProjectList extends Component {
    // Send ajax request to get all project from database
    componentDidMount() {
        this.props.fetchProjectsAsyc();
    }

    render() {
        const { projects, loading, error, theme } = this.props;
        let bg = theme.mode;
        let text = bg === "light" ? "dark" : "light";

        let projectList = (
            <>
                <Link
                    className={`btn btn-${theme.skin} btn-sm mb-3`}
                    to="/create"
                >
                    Create new Project
                </Link>
                <ul className="list-group list-group-flush">
                    {projects !== "undefined"
                        ? projects.map(project => (
                              <Link
                                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-${bg} text-${text}`}
                                  to={`/${project.id}`}
                                  key={project.id}
                              >
                                  {project.name}
                                  <span
                                      className={`badge badge-${theme.skin} badge-pill`}
                                  >
                                      {project.tasks_count}
                                  </span>
                              </Link>
                          ))
                        : null}
                </ul>
            </>
        );

        // display projects only if they are available in db
        if (projects.length === 0) {
            projectList = (
                <p>
                    <strong style={{ color: "red" }}>No Projects Found!</strong>
                </p>
            );
        }

        // Show loader while loading getting projects from API
        if (loading) {
            projectList = (
                <center>
                    <Spinner skin={theme.skin} />
                </center>
            );
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div
                            className={`card border-${theme.skin} mb-3
                                ${
                                    theme.mode === "light"
                                        ? "bg-light "
                                        : "text-white bg-dark"
                                }`}
                        >
                            <div className="card-header">
                                <strong>All Projects</strong>
                            </div>
                            <div className="card-body">
                                {error ? (
                                    <p>
                                        <strong style={{ color: "red" }}>
                                            Something went wrong
                                        </strong>
                                    </p>
                                ) : (
                                    projectList
                                )}
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
)(withTheme(ProjectList));
