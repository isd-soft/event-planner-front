// import React, {Component} from "react";
import './registration.css';
// import {Link} from "react-router-dom";
import axios from 'axios';
// class RegisterPage extends Component {
//
//     constructor(props) {
//         super(props)
// debugger;
//         this.state = {
//             formDataRegistration: {}, // Contains login form data
//             errorsRegistration: {}, // Contains registration field errorsRegistration
//             formSubmittedRegistration: false, // Indicates submit status of registration form
//             loadingRegistration: false, // Indicates in progress state of registration formm
//         }
//     }
//
//     handleChange = (event) => {
//         const target = event.target;
//         const value = target.value;
//
//
//         let {formDataRegistration} = this.state;
//
//         this.setState({
//             formDataRegistration: formDataRegistration
//         });
//     }
//
//     validateRegistrationForm = (e) => {
//
//         let errorsRegistration = {};
//         const {formDataRegistration} = this.state;
//
//
//         if (isEmpty(formDataRegistration.name)) {
//             errorsRegistration.name = "Name can't be blank";
//         } else if (!isName(formDataRegistration.name)) {
//             errorsRegistration.name = "Please enter a valid name.";
//         }
//
//         if (isEmpty(formDataRegistration.surname)) {
//             errorsRegistration.surname = "Surname can't be blank";
//         } else if (!isSurname(formDataRegistration.surname)) {
//             errorsRegistration.surname = "Please enter a valid surname.";
//         }
//
//
//         if (isEmpty(formDataRegistration.email)) {
//             errorsRegistration.email = "Email can't be blank";
//         } else if (!isEmail(formDataRegistration.email)) {
//             errorsRegistration.email = "Please enter a valid email.";
//         }
//
//
//         if (isEmpty(formDataRegistration.password)) {
//             errorsRegistration.password = "Password can't be blank";
//         } else if (isContainWhiteSpace(formDataRegistration.password)) {
//             errorsRegistration.password = "Password should not contain white spaces";
//         } else if (!isLength(formDataRegistration.password, {gte: 6, lte: 16, trim: true})) {
//             errorsRegistration.password = "Password's length must between 6 to 16";
//         }
//
//         if (isEmpty(errorsRegistration)) {
//             return true;
//         } else {
//             return errorsRegistration;
//         }
//     }
//
//
//     registration = (e) => {
//
//         e.preventDefault();
//
//
//         let errorsRegistration = this.validateRegistrationForm();
//
//
//         axios.post('http://localhost:8080/register',{
//             username
//            })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//         if (errorsRegistration === true) {
//             alert("You are successfully signed up with:" + "      Email:" + this.state.formDataRegistration.username + "" + "       Password:" + this.state.formDataRegistration.password);
//             window.location.reload();
//         } else {
//             this.setState({
//                 errorsRegistration: errorsRegistration,
//                 formSubmittedRegistration: true
//             });
//         }
//     }
//
//
//     render() {
//
//         const {errorsRegistration, formSubmittedRegistration} = this.state;
//
//         return (
//             <div className="RegisterPage">
//                 <Row>
//                     <form onSubmit={this.registration}>
//                         <label><h2><b>Sign-up</b></h2></label>
//                         <FormGroup controlId="username"
//                                    validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
//                             <ControlLabel>Name</ControlLabel>
//                             <FormControl type="text" name="username" placeholder="Enter your username"
//                                          onChange={this.handleChange}/>
//                             {errorsRegistration.username &&
//                             <HelpBlock>{errorsRegistration.username}</HelpBlock>
//                             }
//                         </FormGroup>
//
//                         <FormGroup controlId="surname"
//                                    validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
//                             <ControlLabel>Surname</ControlLabel>
//                             <FormControl type="text" name="surname" placeholder="Enter your surname"
//                                          onChange={this.handleChange}/>
//                             {errorsRegistration.surname &&
//                             <HelpBlock>{errorsRegistration.surname}</HelpBlock>
//                             }
//                         </FormGroup>
//
//                         <FormGroup controlId="email"
//                                    validationState={formSubmittedRegistration ? (errorsRegistration.username ? 'error' : 'success') : null}>
//                             <ControlLabel>Email</ControlLabel>
//                             <FormControl type="text" name="email" placeholder="Enter your email"
//                                          onChange={this.handleChange}/>
//                             {errorsRegistration.email &&
//                             <HelpBlock>{errorsRegistration.email}</HelpBlock>
//                             }
//                         </FormGroup>
//
//
//                         <FormGroup controlId="password"
//                                    validationState={formSubmittedRegistration ? (errorsRegistration.password ? 'error' : 'success') : null}>
//                             <ControlLabel>Password</ControlLabel>
//                             <FormControl type="password" name="password" placeholder="Enter your password"
//                                          onChange={this.handleChange}/>
//                             {errorsRegistration.password &&
//                             <HelpBlock>{errorsRegistration.password}</HelpBlock>
//                             }
//                         </FormGroup>
//
//                         <FormGroup controlId="password"
//                                    validationState={formSubmittedRegistration ? (errorsRegistration.password ? 'error' : 'success') : null}>
//                             <ControlLabel>Confirm your password</ControlLabel>
//                             <FormControl type="password" name="passwordConfirmation" placeholder="Reenter your password"
//                                          onChange={this.handleChange}/>
//                             {errorsRegistration.password &&
//                             <HelpBlock>{errorsRegistration.password}</HelpBlock>
//                             }
//                         </FormGroup>
//                         <p>
//                             <Button type="submit" bsStyle="primary">Sign-Up</Button>
//                             <Link to='/login'>Log in here,if you are signed up.</Link></p>
//
//                     </form>
//
//                 </Row>
//
//             </div>
//         )
//     }
// }
//
// export default RegisterPage;
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;

        // const { dispatch } = this.props;
        // if (user.firstName && user.lastName && user.username && user.password) {
        //     dispatch(userActions.register(user));
        axios.post('http://localhost:8080/register', user).then


        // .then(response => response.status())
        // .then(data => {
        //     if(data.status == 200){
        //         this.props.history.push("/");
        //         console.log('Successfully Login');
        //     }
        // })
        // }
    }

    render() {
        const {registering} = this.props;
        const {user, submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName}
                               onChange={this.handleChange}/>
                        {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName}
                               onChange={this.handleChange}/>
                        {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username}
                               onChange={this.handleChange}/>
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password}
                               onChange={this.handleChange}/>
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email}
                               onChange={this.handleChange}/>
                        {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
// export {connectedRegisterPage as RegisterPage};
export default RegisterPage;
