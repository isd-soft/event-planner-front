import React, {Component} from "react";
import {Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import './registration.css';
import {isName, isSurname, isEmail, isEmpty, isLength, isContainWhiteSpace, passwordMatching} from 'shared/validator';
import {Route, Link} from "react-router-dom";

class Registration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: '',
            }, // Contains registration form data
            errorsRegistration: {}, // Contains registration field errorsRegistration
            formSubmittedRegistration: false, // Indicates submit status of registration form
            loadingRegistration: false // Indicates in progress state of registration form
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let {formData} = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateRegistrationForm = (e) => {

        let errorsRegistration = {};
        const {formData} = this.state;


        if (isEmpty(formData.name)) {
            errorsRegistration.name = "Name can't be blank";
        } else if (!isName(formData.name)) {
            errorsRegistration.name = "Please enter a valid name.";
        }

        if (isEmpty(formData.surname)) {
            errorsRegistration.surname = "Surname can't be blank";
        } else if (!isSurname(formData.surname)) {
            errorsRegistration.surname = "Please enter a valid surname.";
        }


        if (isEmpty(formData.email)) {
            errorsRegistration.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errorsRegistration.email = "Please enter a valid email.";
        }


        if (isEmpty(formData.password)) {
            errorsRegistration.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errorsRegistration.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, {gte: 6, lte: 16, trim: true})) {
            errorsRegistration.password = "Password's length must between 6 to 16";
        }

        if (!(passwordMatching(formData.password, formData.confirmPassword))) {
            errorsRegistration.confirmPassword = "Passwords don't match.";
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

        if (errorsRegistration === true) {
            alert("You are successfully signed up with:" + "      Email:" + this.state.formData.email + "       Password:" + this.state.formData.password + "           Password" +
                "confirmation:" + this.state.formData.confirmPassword);
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
                        <FormGroup controlId="name"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.name ? 'error' : 'success') : null}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl type="text" name="name" placeholder="Enter your name"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.name &&
                            <HelpBlock>{errorsRegistration.name}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="surname"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.surname ? 'error' : 'success') : null}>
                            <ControlLabel>Surname</ControlLabel>
                            <FormControl type="text" name="surname" placeholder="Enter your surname"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.surname &&
                            <HelpBlock>{errorsRegistration.surname}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="email"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.email ? 'error' : 'success') : null}>
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

                        <FormGroup controlId="confirmPassword"
                                   validationState={formSubmittedRegistration ? (errorsRegistration.confirmPassword ? 'error' : 'success') : null}>
                            <ControlLabel>Confirm password</ControlLabel>
                            <FormControl type="password" name="confirmPassword" placeholder="Enter your password"
                                         onChange={this.handleChange}/>
                            {errorsRegistration.confirmPassword &&
                            <HelpBlock>{errorsRegistration.confirmPassword}</HelpBlock>
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