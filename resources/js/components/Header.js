import React from "react";
import { Link } from "react-router-dom";
import { FaToggleOff, FaToggleOn, FaSquare, FaRegCircle } from "react-icons/fa";
import { withTheme } from "styled-components";
import $ from "jquery";
import Popper from "@popperjs/core";

const Header = props => {
    const skins = [
        "primary",
        "secondary",
        "danger",
        "success",
        "warning",
        "info"
    ];

    const square = skins.map(skin => {
        return (
            <FaSquare
                key={skin}
                className={`text-${skin} colored-square border rounded ${
                    props.theme.skin === skin ? "border-white" : "border-dark"
                }`}
                onClick={() => {
                    props.toggleFunc.toggleSkin(skin);
                }}
            />
        );
    });

    return (
        <nav className={`navbar navbar-expand-md bg-${props.theme.skin}`}>
            <div className="container">
                <div className="col-9">
                    <Link className="navbar-brand text-white mb-0 h1" to="/">
                        Tasksman
                    </Link>
                </div>
                <div className="col-3">{square}</div>
                <div className="col-1">
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
            </div>
        </nav>
    );
};

export default withTheme(Header);
