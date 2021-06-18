import React from 'react';
import './App.css';
import Layout from './components/layout'
import './css/main.css'
import './css/util.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {RouteProps} from "react-router";
import routes from "./routes";


const routeComponents = routes.map(({ path, component }: RouteProps, key) => <Route exact path={path} component={component} key={key} />);

function App() {
  return (

        <Layout>
            <Router>
                <Switch>
                    {routeComponents}
                </Switch>
            </Router>
        </Layout>

  );
}

export default App;
