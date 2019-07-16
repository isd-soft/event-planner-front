import React, {Component} from 'react';
import Login from 'components/login/Login';
import Register from 'components/registration/Registration';
import FetchRandomUser from 'components/test/FetchRandomUser'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Auth from 'components/LoginComponent';


class App extends Component {
    render() {
        return (
            <Router>

                <div>
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Register}/>
                    {/*<Route path='/fetch' component={FetchRandomUser}/>*/}
                    <Router path='/auth' component={Auth}/>
                </div>

            </Router>
        );
    }
}

export default App;
