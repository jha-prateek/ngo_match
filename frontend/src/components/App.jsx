import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header.jsx'
import Dashboard from './Dashboard.jsx'
import Form from './Form'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="main-body">
                    <Header></Header>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/register" exact component={Form} />
                        <Route component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
