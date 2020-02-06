import React from "react";
import { Link } from "react-router-dom";

export const Header = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark navbar-laravel">
            <div className="container">
                <Link className="navbar-brand mb-0 h1" to="/">
                    Tasksman
                </Link>
            </div>
        </nav>
    );
};
