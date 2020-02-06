import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./Header";
import ProjectsList from "./ProjectList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";
import { Provider } from "react-redux";
import { store } from "../store";
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
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
    ReactDOM.render(<App />, document.getElementById("app"));
}
