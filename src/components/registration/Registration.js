import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Row} from 'react-bootstrap';
import './registration.css';
import {isContainWhiteSpace, isEmail, isEmpty, isLength, isName, isSurname} from 'shared/validator';
import {Link} from "react-router-dom";
import axios from 'axios';

class Registration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formDataRegistration: {}, // Contains login form data
            errorsRegistration: {}, // Contains registration field errorsRegistration
            formSubmittedRegistration: false, // Indicates submit status of registration form
            loadingRegistration: false, // Indicates in progress state of registration form
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const username = target.name;
        // const password=target.password;

        let {formDataRegistration} = this.state;
        formDataRegistration[username] = value;

        this.setState({
            formDataRegistration: formDataRegistration
        });
    }

    validateRegistrationForm = (e) => {

        let errorsRegistration = {};
        const {formDataRegistration} = this.state;


        if (isEmpty(formDataRegistration.name)) {
            errorsRegistration.name = "Name can't be blank";
        } else if (!isName(formDataRegistration.name)) {
            errorsRegistration.name = "Please enter a valid name.";
        }

        if (isEmpty(formDataRegistration.surname)) {
            errorsRegistration.surname = "Surname can't be blank";
        } else if (!isSurname(formDataRegistration.surname)) {
            errorsRegistration.surname = "Please enter a valid surname.";
        }


        if (isEmpty(formDataRegistration.email)) {
            errorsRegistration.email = "Email can't be blank";
        } else if (!isEmail(formDataRegistration.email)) {
            errorsRegistration.email = "Please enter a valid email.";
        }


        if (isEmpty(formDataRegistration.password)) {
            errorsRegistration.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formDataRegistration.password)) {
            errorsRegistration.password = "Password should not contain white spaces";
        } else if (!isLength(formDataRegistration.password, {gte: 6, lte: 16, trim: true})) {
            errorsRegistration.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errorsRegistration)) {
            return true;
        } else {
            return errorsRegistration;
        }
    }


    registration = (e) => {

        e.preventDefault();


        let errorsRegistration = this.validateRegistrationForm();


        axios.post('http://localhost:8080/registration', {})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        if (errorsRegistration === true) {
            alert("You are successfully signed up with:" + "      Email:" + this.state.formDataRegistration.username + "" + "       Password:" + this.state.formDataRegistration.password);
            window.location.reload();
        } else {
            this.setState({
                errorsRegistration: errorsRegistration,
                formSubmittedRegistration: true
            });
        }
    }


    render() {

        const {errorsRegistration, formSubmittedRegistration} = this.state;

        return (
            <div className="Registration">
                <Row>
                    <form onSubmit={this.registration}>
                        <label><h2><b>Sign-up</b></h2></label>
                        <FormGroup controlId="username"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your username"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.username &&
                            <HelpBlock>{errorsRegistration.username}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="surname"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
                            <ControlLabel>Surname</ControlLabel>
                            <FormControl type="text" name="surname" placeholder="Enter your surname"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.surname &&
                            <HelpBlock>{errorsRegistration.surname}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="email"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.email &&
                            <HelpBlock>{errorsRegistration.email}</HelpBlock>
                            }
                        </FormGroup>


                        <FormGroup controlId="password"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.password ? 'error' : 'success') : null}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.password &&
                            <HelpBlock>{errorsRegistration.password}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="password"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.password ? 'error' : 'success') : null}>
                            <ControlLabel>Confirm your password</ControlLabel>
                            <FormControl type="password" name="passwordConfirmation" placeholder="Reenter your password"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.password &&
                            <HelpBlock>{errorsRegistration.password}</HelpBlock>
                            }
                        </FormGroup>
                        <p>
                            <Button type="submit" bsStyle="primary">Sign-Up</Button>
                            <Link to='/login'>Log in here,if you are signed up.</Link></p>

                    </form>

                </Row>

            </div>
        )
    }
}

export default Registration;