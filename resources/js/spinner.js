import React from "react";

export const Spinner = props => {
    return (
        <div
            className={`spinner-border text-${props.skin}`}
            role="status"
        ></div>
    );
};
