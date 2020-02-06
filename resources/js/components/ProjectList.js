import React, { Component } from "react";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "../actions/listing";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
// List all projects
class ProjectList extends Component {
    // Send ajax request to get all project from database
    componentDidMount() {
        this.props.fetchProjectsAsyc();
    }

    render() {
        console.log(this.props);
        const { projects, loading, error } = this.props;

        let projectList = (
            <>
                <Link className="btn btn-primary btn-sm mb-3" to="/create">
                    Create new Project
                </Link>
                <ul className="list-group list-group-flush">
                    {projects !== "undefined"
                        ? projects.map(project => (
                              <Link
                                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                  to={`/${project.id}`}
                                  key={project.id}
                              >
                                  {project.name}
                                  <span className="badge badge-primary badge-pill">
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
            projectList = <ClipLoader />;
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
