import React, {Component} from 'react';
import Login from 'components/login/Login';
import Register from 'components/registration/Registration';
import { BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <Router>
                <div>

                    {/*<Route path='/' component={App}/>*/}

                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Register}/>
                </div>
            </Router>
        );
    }
}

export default App;
