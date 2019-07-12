import React, { Component } from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Login />
				{/*<Register/>*/}
			</div>


		);
	}
}

export default App;
