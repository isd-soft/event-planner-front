import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Row} from 'react-bootstrap';
import './login.css';
import './backimage.png';
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import {Link} from "react-router-dom";
import axios from 'axios'


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            email: null,
            password: null,

        }
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let {formData} = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    };

    validateLoginForm = (e) => {

        let errors = {};
        const {formData} = this.state;
        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        if (isEmpty(formData.username)) {
            errors.username = "Username can't be blank";
        } else if (!isEmail(formData.username)) {
            errors.username = "Please enter a valid username";
        }
        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank"
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, {gte: 6, lte: 16, trim: true})) {
            errors.password = "Password's length must between 6 to 16";
        }
        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    };

    login = (e) => {

        e.preventDefault();
        let errors = this.validateLoginForm();

        axios.post('http://localhost:8080/authenticate', {
            username: this.state.formData.username,
            password: this.state.formData.password
        }).then(res => {
            const token = res.data.token;
            const id = res.data.id;
            if (token && id) {
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("id", id);
                this.props.history.push("/dashboard");
                console.log(this.props)
            }
        })
            .catch(function (error) {
                console.log(error);
            });


        if (errors === true) {
            alert("You are successfully signed in with:" + "        Email:" + this.state.formData.username + "" + "       Password:" + this.state.formData.password);
            window.location.reload();
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }

    };


    render() {

        const {errors, formSubmitted} = this.state;

        return (


            <div className="Login">
                <img src="backimage.png" id="bg" alt=""/>

                <Row>

                    <form onSubmit={this.login}>
                        <label><h2><b>Log in</b></h2></label>
                        <FormGroup controlId="username"
                                   validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your username"
                                         onChange={this.handleInputChange}/>
                            {errors.username &&
                            <HelpBlock>{errors.username}</HelpBlock>
                            }
                        </FormGroup>
                        <FormGroup controlId="password"
                                   validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password"
                                         onChange={this.handleInputChange}/>
                            {errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                            }
                        </FormGroup>
                        <p>
                            <Button type="submit" bsStyle="primary">Sign-In</Button>
                            <Link to='/registration'>  Register here,if you are not signed up.</Link></p>
                    </form>

                </Row>
            </div>

            )
    }
}

export default Login;