import React, {Component} from "react";
import './myProfile.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import axios from 'axios';


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
            }
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

    handleSubmit = e =>
    {
        let id = localStorage.getItem('id');
        e.preventDefault();
        const {user} = this.state;

        console.log('State:'+this.state.user);

        axios.put('http://localhost:8080/user/' + id,user
                )
            .then(res => console.log(res.data));
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
            // console.log(response)
        })
            .catch(error => {
                console.log(error);
            });
    }

    logout(){
        localStorage.clear();
    }

    render() {
        const {user} = this.state;

        return (
            <div>
                <div className="header">
                    <Link to={"/login"}>
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
                                        <span className={"dashboard-text"}>Dashboard</span>
                                    </a>
                                </Link>
                            </p>
                            <br></br>

                            <p>
                                <Link to={"/profile"}>
                                    <a href="#">
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span className={"dashboard-text"}> My Profile</span>
                                    </a>
                                </Link>
                            </p>

                            <br></br>

                            <p>
                                <Link to={"/create"}>
                                    {/*<a href="#">*/}
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}>Create Event</span>
                                    {/*</a>*/}
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className={"title"}>My profile</label>
                </div>
                <div className="profile-card" href="#profile">

                    <div className="logo-img">
                        <div className="profile-card-body">
                            <form onSubmit={this.handleSubmit}>
                               <p> <FormGroup controlId="firstname">
                                    <ControlLabel class={"col-sm-5"}>First Name</ControlLabel>
                                    <div class="col-sm-5">
                                        <FormControl type="text" name="firstname" value={user.firstname}
                                                     onChange={this.handleChange}/>
                                    </div>
                               </FormGroup></p>

                                <FormGroup controlId="lastname">
                                    <ControlLabel>Last Name</ControlLabel>
                                    <div class="col-sm-5">
                                        <FormControl
                                            type="text" name="lastname"
                                            onChange={this.handleChange}
                                            value={user.lastname}/>
                                    </div>
                                </FormGroup>

                                    <ControlLabel >Email</ControlLabel>
                                <div class="col-sm-5">   {user.email}
                                    </div>




                                <FormGroup controlId="description">
                                    <ControlLabel>Description</ControlLabel>
                                    <div class="col-sm-5">
                                        <FormControl
                                            type={"text"} name={"description"}
                                            onChange={this.handleChange}
                                            value={user.description}/>
                                    </div>
                                </FormGroup>
                                <FormGroup controlId="phoneNumber">
                                    <ControlLabel>Phone Number</ControlLabel>
                                    <div class="col-sm-5">
                                        <FormControl
                                            type={"text"} name={"phoneNumber"}
                                            onChange={this.handleChange}
                                            value={user.phoneNumber}/>
                                    </div>
                                </FormGroup>


                                <ControlLabel >Username</ControlLabel>
                                <div class="col-sm-5">   {user.username}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="sell">Gender</label>
                                    <div className="col-sm-5">
                                        <select className="form-control" id="sel1" name={"gender"}
                                                onChange={this.handleChange}
                                                value={user.gender}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <button type={"submit"} className="btn btn-primary">Save</button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}