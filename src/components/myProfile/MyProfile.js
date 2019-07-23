import React, {Component} from "react";
import './myProfile.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import axios from 'axios';



export default class MyProfile extends Component {

    constructor(props){
        super(props);
    this.state = {
            name: '',
            surname: '',
            gender: '',
            email:'',
            description:'',
            username:''
        }
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
        axios.get(
            'http://localhost:8080/userinfo/6',{mode:'no-cors'}
        ).then(response => {
            this.setState({userInfo: response.data.content});
            console.log(response)
        })
            .catch(error => {
                console.log(error);
            });
    }



    render() {

        return (
            <div>
                <div className="header">
                    {/*<Link to={"/login"}>*/}
                        <a className={"logOutButton"}>
                            <button className={"btn btn-primary"}>Log out</button>
                        </a>
                    {/*</Link>*/}
                </div>
                <div className="side-nav">
                    <div className="author">
                        <h4 className={"nameOfCompany"}>ISD Events</h4>
                        <div className="logo">
                            <a
                                className="simple-text logo-mini"
                            >
                                <div className="logo-img">
                                    <img src={logo} alt="logo"/>
                                </div>
                            </a>
                            <h4
                                className="name_surname_text"
                            >
                                {this.componentDidMount()} {this.state.surname}
                            </h4>
                        </div>


                    </div>
                    <nav>
                        <ul>
                            <hr></hr>

                            <p>

                                <Link to={"/dashboard"} className={"dashboard-text"}>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span><i className="fa fa-user"></i></span>
                                    <span className={"dashboard-text"}>Dashboard</span>
                                </Link>
                            </p>
                            <hr></hr>

                            <p>
                                <Link to={"/profile"} className={"dashboard-text"}>
                                    <a href="#">
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span><i className="fa fa-user"></i></span>
                                        <span className={"dashboard-text"}>My Profile</span>
                                    </a>
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
                        <img src={logo} alt="logo"/>

                        {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                        <div className="profile-card-body">
                            <FormGroup controlId="name">
                                <ControlLabel>Name</ControlLabel>
                                <div class="col-sm-5">
                                <FormControl type="text" name="name" placeholder={this.state.name}/>
                                </div>
                            </FormGroup >

                            <FormGroup controlId="surname">
                                <ControlLabel>Surname</ControlLabel>
                                <div class="col-sm-5">
                                    <FormControl type="text" name="surname" placeholder={this.state.surname}/>
                                </div>
                            </FormGroup >
                            <FormGroup controlId="email">
                                <ControlLabel>Email</ControlLabel>
                                <div class="col-sm-5">
                                    <FormControl type="text" name="email" placeholder={this.state.email}/>
                                </div>
                            </FormGroup >
                            <FormGroup controlId="description">
                                <ControlLabel>Description</ControlLabel>
                                <div class="col-sm-5">
                                    <FormControl type="text" name="description" placeholder={this.state.description}/>
                                </div>
                            </FormGroup >
                            <FormGroup controlId="username">
                                <ControlLabel>Username</ControlLabel>
                                <div class="col-sm-5">
                                    <FormControl type="text" name="username" placeholder={this.state.name}/>
                                </div>
                            </FormGroup >
                            <div className="form-group">
                                <label htmlFor="sell">Gender</label>
                                <div className="col-sm-5">
                                <select className="form-control" id="sel1">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                </div>
                            </div>


                            <a href="/save" className="btn btn-primary" >Save</a>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}