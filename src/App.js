import React, {Component} from 'react';
import Login from 'components/login/Login';
import Registration from 'components/registration/Registration';
import Dashboard from 'components/dashboard/Dashboard';

import {BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <Router>
                <div>

                    {/*<Route path='/' component={App}/>*/}

                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/dashboard' component={Dashboard}/>

                </div>
            </Router>



        );
    }
}

export default App;
