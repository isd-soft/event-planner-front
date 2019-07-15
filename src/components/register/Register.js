import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './register.css';
import { isUsername, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Register extends Component {

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

        let {formData} = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }


    render() {

        const {errors, formSubmitted} = this.state;

        return (
                <div className="Register">
                    <Row>
                        <form onSubmit={this.register}>
                            <label><h2><b>Registration</b></h2></label>
                            <FormGroup controlId="name"
                                       validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl type="text" name="name" placeholder="Enter your name"
                                             onChange={this.handleInputChange}/>
                                {errors.username &&
                                <HelpBlock>{errors.username}</HelpBlock>
                                }
                            </FormGroup>

                            <FormGroup controlId="surname"
                                       validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                                <ControlLabel>Surname</ControlLabel>
                                <FormControl type="text" name="surname" placeholder="Enter your surname"
                                             onChange={this.handleInputChange}/>
                                {errors.username &&
                                <HelpBlock>{errors.username}</HelpBlock>
                                }
                            </FormGroup>

                            <FormGroup controlId="email"
                                       validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl type="text" name="email" placeholder="Enter your email"
                                             onChange={this.handleInputChange}/>
                                {errors.username &&
                                <HelpBlock>{errors.username}</HelpBlock>
                                }
                            </FormGroup>

                            <FormGroup controlId="role">
                                <ControlLabel>Your role</ControlLabel>
                                <p>
                                <select name="role">
                                    <option value="Administrator">Administrator</option>
                                    <option value="Organiser">Organiser</option>
                                    <option value="Participant">Participant</option>
                                </select></p>
                            </FormGroup>

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

                            <FormGroup controlId="password"
                                       validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                                <ControlLabel>Confirm your password</ControlLabel>
                                <FormControl type="passwordConfirmation" name="passwordConfirmation" placeholder="Reenter your password"
                                             onChange={this.handleInputChange}/>
                                {errors.password &&
                                <HelpBlock>{errors.password}</HelpBlock>
                                }
                            </FormGroup>
                            <Button type="submit" bsStyle="primary">Sign-Up</Button>
                        </form>

                    </Row>

                </div>
        )
    }
}
export default Register;