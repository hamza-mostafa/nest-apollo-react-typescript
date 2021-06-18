import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    cache: new InMemoryCache()
})


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
