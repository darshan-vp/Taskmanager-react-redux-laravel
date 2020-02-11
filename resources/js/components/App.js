import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import ProjectsList from "./ProjectList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";
import { Provider } from "react-redux";
import { store } from "../store";
import { MyThemeProvider, ThemeToggleContext } from "../context/ThemeContext";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <ThemeToggleContext.Consumer>
                            {value => <Header toggleFunc={value} />}
                        </ThemeToggleContext.Consumer>
                        <Switch>
                            <Route exact path="/" component={ProjectsList} />
                            <Route path="/create" component={NewProject} />
                            <Route path="/:id" component={SingleProject} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(
        <MyThemeProvider>
            <App />
        </MyThemeProvider>,
        document.getElementById("app")
    );
}
