import React, { createContext, useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "../theme";

// Create context object
export const ThemeToggleContext = createContext();

// Create Provider component
export const MyThemeProvider = ({ children }) => {
    // Set initial them state to light mode
    const [themeState, setThemeState] = useState({ mode: "light" });
    const [skin, setSkin] = useState("primary");

    // styled-component to set background color and text color according to theme selected
    // this will create new component with mentioned styles
    const Wrapper = styled.div`
        background-color: ${backgroundColor};
        color: ${textColor};
    `;

    // Toggle function to switch theme.
    const toggle = () => {
        const mode = themeState.mode === "light" ? "dark" : "light";
        setThemeState({ mode });
    };

    const toggleSkin = skin => {
        setSkin(skin);
    };

    return (
        // Provider component with value property set to toggle function so this function can called from anywhere
        // in the consumer
        <ThemeToggleContext.Provider value={{ toggle, toggleSkin }}>
            {/* this is provided by styled-component theme prop is compulsory here*/}
            <ThemeProvider theme={{ mode: themeState.mode, skin }}>
                <Wrapper>{children}</Wrapper>
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};

export default ThemeProvider;
