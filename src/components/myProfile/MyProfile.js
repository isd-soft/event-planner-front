import React, {Component} from "react";
import './myProfile.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import axios from 'axios';
import swal from "sweetalert";


export default class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                gender:'',
                description:''
            },
            copyUser:{
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                gender:'',
                description:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {copyUser} = this.state;
        this.setState({
            copyUser: {
                ...copyUser,
                [name]: value  //see
            }
        });
    }

    handleSubmit = e =>
    {
        let id = localStorage.getItem('id');
        e.preventDefault();
        const {copyUser} = this.state;

        axios.put('http://localhost:8080/user/' + id,copyUser
                )
            .then(response => {
                swal("Good job!", "Your profile details were updated!", "success");

            })
            .catch(error => {
                swal("Oops!", "Your profile details were not updated!", "error");

            })
    }

    componentDidMount() {
        axios.interceptors.request.use((config) => {
                let token = localStorage.getItem('jwtToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        let id = localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(response => {
            this.setState({user: response.data});
        })
            .catch(error => {
                console.log(error);
            });
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(response => {
            this.setState({copyUser: response.data});
        })
            .catch(error => {
                console.log(error);
            });
    }

    logout(){
        localStorage.clear();
    }

    render() {
        const {user,copyUser} = this.state;

        return (
            <div>
                <div className="header">
                    <Link to={"/"}>
                        <a>
                            <button className={"logOutButton"} onClick={this.logout}>Log out</button>
                        </a>
                    </Link>
                </div>
                <div className="side-nav">
                    <div className="author">
                        {/*<h4 className={"nameOfCompany"}>ISD Events</h4>*/}
                        <div className="logo">
                            <a
                                className="simple-text logo-mini"
                            >
                                <div className="logo-img">
                                    <img src={logo} alt="logo"/>
                                </div>
                            </a>
                            <hr></hr>

                            <h4
                                className="firstname_lastname_text"
                            aria-readonly={"true"}>
                                {user.firstname} {user.lastname}
                            </h4>
                            <br></br>

                        </div>
                    </div>
                    <nav>
                        <ul>
                            <p>
                                <Link to={"/dashboard"} className={"dashboard-text"}>
                                    <a href="#">
                                        <br></br>
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span><i className="fa fa-user"></i></span>
                                        <span className={"dashboard-text"}>DASHBOARD</span>
                                    </a>
                                </Link>
                            </p>
                            <br></br>

                            <p>
                                <Link to={"/profile"}>
                                    <a href="#">
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span className={"dashboard-text"}> MY PROFILE</span>
                                    </a>
                                </Link>
                            </p>

                            <br></br>

                            <p>
                                <Link to={"/create"}>
                                    {/*<a href="#">*/}
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}>CREATE EVENT</span>
                                    {/*</a>*/}
                                </Link>
                            </p>
                            <br></br>

                            <p>
                                <Link to={"/myevents"}>
                                    {/*<a href="#">*/}
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}> MY EVENTS</span>
                                    {/*</a>*/}
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className="top-label">MY PROFILE</label>
                </div>
                <div className="profile-card2" href="#profile">

                        <div className="profile-card-body2">
                            <form class="form-horizontal"  onSubmit={this.handleSubmit}>
                                <FormGroup controlId="firstname_lastname">
                                    <div class="col-sm-5">
                                        <ControlLabel class={"col-sm-5"} >First Name</ControlLabel>
                                        <FormControl
                                            type="text" name="firstname"
                                            onChange={this.handleChange}
                                            value={copyUser.firstname}/>
                                    </div>
                                    <div className="col-sm-5">
                                        <ControlLabel class={"col-sm-5"}>Last Name</ControlLabel>
                                        <FormControl
                                            type="text" name="lastname"
                                            onChange={this.handleChange}
                                            value={copyUser.lastname}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="username_email">
                                    <div className="col-sm-5">
                                        <ControlLabel>Username</ControlLabel>
                                        <br/>
                                        {copyUser.username}
                                    </div>
                                    <div className="col-sm-5">
                                        <ControlLabel>Email</ControlLabel>
                                        <br/>
                                        {copyUser.email}
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="description">
                                    <div class="col-sm-5">
                                        <ControlLabel>Description</ControlLabel>
                                        <FormControl
                                            placeholder={"Enter your description"}
                                            type={"text"} name={"description"}
                                            onChange={this.handleChange}
                                            value={copyUser.description}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="phoneNumber">
                                    <div class="col-sm-5">
                                        <ControlLabel>Phone Number</ControlLabel>
                                        <FormControl
                                            placeholder={"Enter your description"}
                                            type={"text"} name={"phoneNumber"}
                                            onChange={this.handleChange}
                                            value={copyUser.phoneNumber}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="phoneNumber">
                                    <div className="col-sm-5">
                                        <label htmlFor="sell">Gender</label>
                                        <select required className="form-control" id="sel1" name={"gender"}
                                                onChange={this.handleChange}
                                                value={copyUser.gender}>
                                            <option value="" disabled selected>Click to select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </FormGroup>

                                <button  type={"submit"} className="btn btn-primary">Save</button>
                            </form>
                        </div>
                </div>
            </div>

        );
    }
}