import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.css';
import { isUsername, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from 'components/register/Register';
class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.username)) {
            errors.username = "Username can't be blank";
        } else if (!isUsername(formData.username)) {
            errors.username = "Please enter a valid username";
        }

        // if (isEmpty(formData.password)) {
        //     errors.password = "Password can't be blank";
        // }  else if (isContainWhiteSpace(formData.password)) {
        //     errors.password = "Password should not contain white spaces";
        // } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
        //     errors.password = "Password's length must between 6 to 16";
        // }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    // async componentDidMount() {
    //     const url = "http://localhost:8080/login";
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     this.setState({person: data.results[0], loading: false});
    // }
    login = (e) => {

        e.preventDefault();

        let obj = {};
        obj.username = this.state.username;
        obj.password = this.state.password;

        fetch('http://localhost:8080/login', {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",

                },
                method: 'GET'

                }
        ).then();
        console.log(obj.password, obj.username)
        let errors = this.validateLoginForm();
// let errors=false;
        if(errors === true){
            alert("You are successfully signed in with:"+"Username:"+this.state.formData.username+""+"Password:"+this.state.formData.password);
            window.location.reload();
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }

    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (

            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        {/*<li type="Sign Up" bsStyle="secondary">Sign Up</li>*/}
                        <label><h2><b>Log in</b></h2></label>
                        <FormGroup controlId="username" validationState={ formSubmitted ? (errors.username ? 'error' : 'success') : null }>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your username" onChange={this.handleInputChange} />
                            { errors.username &&
                            <HelpBlock>{errors.username}</HelpBlock>
                            }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            { errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                            }
                        </FormGroup>
                        <p>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                            <Link to='/registration'>Register here,if you are not signed up.</Link></p>
                    </form>

                </Row>


            </div>
        )
    }
}

export default Login;