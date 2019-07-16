import React, {Component} from 'react';
import Login from 'components/login/Login';
import Registration from 'components/registration/Registration';
import FetchRandomUser from 'components/test/FetchRandomUser'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Dashboard from 'components/dashboard/Dashboard'


class App extends Component {
    render() {
        return (
            <Router>

                <div>
                    {/*<Route path='/'component={FetchRandomUser}/>*/}
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/dashboard' component={Dashboard}/>

                </div>

            </Router>
        );
    }
}

export default App;
