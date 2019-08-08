import './registration.css';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import swal from 'sweetalert'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: '',
                passwordConfirmation:'',
                email: ''
            },
            errorMessage: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleErrorMessage = this.handleErrorMessage.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }

    handleErrorMessage = (message) => {
        this.setState({
            errorMessage: this.state.errorMessage + message
        })
    }

    handleSubmit(event) {
        event.preventDefault();


        this.setState({submitted: true});
        const {user} = this.state;
        if (user.firstname && user.lastname && user.username && user.password && user.passwordConfirmation && user.email) {
            if (user.password === user.passwordConfirmation){
                axios.post('http://localhost:8080/register', user).then(res => {
                     if (res.status === 200) {
                         swal("Good job!", "You are successfully registered!", "success");
                         this.props.history.push("/");
                     }
                })
                    .catch(function (error) {
                        swal("Error!", error.response.data, "error");
                        console.log(error.response.status);
                        console.log(error.response.data);
                    });
            }
        }

    }

    render() {
        const {registering} = this.props;
        const {user, submitted, errorMessage} = this.state;
        return (
            <div className="Registration">
                <label><h2><b>Sign Up</b></h2></label>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={user.firstname}
                               onChange={this.handleChange} placeholder={"Enter your firstname"}/>
                        {submitted && !user.firstname &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={user.lastname}
                               onChange={this.handleChange} placeholder={"Enter your lastname"}/>
                        {submitted && !user.lastname &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email}
                               onChange={this.handleChange} placeholder={"Enter your email"}/>
                        {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                        }
                        {submitted && errorMessage &&
                        <div className="help-block">{errorMessage}</div>
                        }

                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username}
                               onChange={this.handleChange} placeholder={"Enter your username"}/>
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password}
                               onChange={this.handleChange} placeholder={"Enter your password"}/>
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !(user.passwordConfirmation === user.password) ? ' has-error' : '')}>
                        <label htmlFor="passwordConfirmation">Confirm password</label>
                        <input type="password" className="form-control" name="passwordConfirmation" value={user.passwordConfirmation}
                               onChange={this.handleChange} placeholder={"Re-enter your password"}/>
                        {submitted && !(user.passwordConfirmation === user.password) &&
                        <div className="help-block">Passwords doesn't match</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Sign Up</button>
                        {registering &&
                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                        <hr></hr>
                        <p><Link to='/'>  Login here,if you are signed up.</Link></p>

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
