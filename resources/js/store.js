import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const middleware = [thunk];
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    var enhancer = composeEnhancers(applyMiddleware(...middleware));
}

export const store = createStore(rootReducer, {}, enhancer);
