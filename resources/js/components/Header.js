import React from "react";
import { Link } from "react-router-dom";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { withTheme } from "styled-components";

const Header = props => {
    return (
        <nav className="navbar navbar-expand-md bg-primary">
            <div className="container">
                <Link className="navbar-brand text-white mb-0 h1" to="/">
                    Tasksman
                </Link>
                {props.theme.mode === "light" ? (
                    <FaToggleOff
                        className="float-right"
                        style={{
                            color: "white",
                            width: "30",
                            height: "30",
                            cursor: "pointer"
                        }}
                        title="Toggle Dark Mode"
                        onClick={() => {
                            props.toggleFunc.toggle();
                        }}
                    />
                ) : (
                    <FaToggleOn
                        className="float-right"
                        style={{
                            color: "white",
                            width: "30",
                            height: "30",
                            cursor: "pointer"
                        }}
                        title="Toggle Dark Mode"
                        onClick={() => {
                            props.toggleFunc.toggle();
                        }}
                    />
                )}
            </div>
        </nav>
    );
};

export default withTheme(Header);
