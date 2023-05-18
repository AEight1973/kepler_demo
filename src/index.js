// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import App from './containers/App';
// import './index.css';
//
// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
//
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from 'react'
// import { Provider } from "react-store";
// // import store from "./store";
// import App from "./containers/App";
// import "./index.css";
// import ReactDOM from "react-dom/client";
//
// import keplerGlReducer from "kepler.gl/reducers";
// import {configureStore} from "@reduxjs/toolkit";
//
// const root = ReactDOM.createRoot(document.getElementById('root'))
//
// const store = configureStore({reducer: keplerGlReducer})
//
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </React.StrictMode>
// )

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./containers/App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
