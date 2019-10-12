import React from 'react';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {configureStore} from "redux-starter-kit";
import rootReducer from "./app/rootReducer";
import * as ReactDOM from "react-dom";


const store = configureStore({
    reducer: rootReducer
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
