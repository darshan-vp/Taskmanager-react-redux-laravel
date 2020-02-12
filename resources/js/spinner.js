import React from "react";

export const Spinner = props => {
    return (
        <div class={`spinner-border text-${props.skin}`} role="status"></div>
    );
};
