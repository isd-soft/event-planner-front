import React, {Component} from 'react';
import Login from 'components/login/Login';
import Register from 'components/register/Register';
import FetchRandomUser from 'components/test/FetchRandomUser'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <Router>

                <div>
                    {/*<Route path='/'component={FetchRandomUser}/>*/}
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Register}/>
                    <Route path='/fetch' component={FetchRandomUser}/>
                </div>

            </Router>
        );
    }
}

export default App;
