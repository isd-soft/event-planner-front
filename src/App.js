import React, {Component} from 'react';
import Login from 'components/login/Login';
import Registration from 'components/registration/RegisterPage';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from 'components/dashboard/Dashboard'
import MyProfile from 'components/myProfile/MyProfile'
import NewEvent from 'components/newEvent/NewEvent'
import {ProtectedRoute} from './components/util/ProtectedRoute'
import EventDetails from "./components/eventDetails/EventDetails";
import MyEvents from "./components/myEvents/MyEvents";

class App extends Component {
    render() {
        return (
            <Router>

                <div>
                    {/*<Route path='/'component={FetchRandomUser}/>*/}
                    <Route exact path="/" component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <ProtectedRoute path='/dashboard' component={Dashboard}/>
                    <ProtectedRoute path={'/profile'} component={MyProfile}/>
                    <ProtectedRoute path={'/create'} component={NewEvent}/>
                    <ProtectedRoute path={'/eventdetails'} component={EventDetails}/>
                    <ProtectedRoute path={'/myevents'} component={MyEvents}/>

                </div>

            </Router>
        );
    }
}

export default App;
