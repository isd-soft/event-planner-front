import React, {Component} from 'react';
import Login from 'components/login/Login';
import Registration from 'components/registration/RegisterPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from 'components/dashboard/Dashboard'
import MyProfile from 'components/myProfile/MyProfile'


class App extends Component {
    render() {
        return (
            <Router>

                <div>
                    {/*<Route path='/'component={FetchRandomUser}/>*/}
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path={'/profile'} component={MyProfile}/>
                </div>

            </Router>
        );
    }
}

export default App;
