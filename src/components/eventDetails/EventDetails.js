import React, {Component} from "react";
import './eventDetails.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import axios from 'axios';


export default class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            _event: {}

        };
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

        //get data about event
        axios.get(
            'http://localhost:8080/events/8'
        ).then(response => {
            this.setState({_event: response.data});
            //console.log(username);
            // console.log(_events)
        })
            .catch(error => {
                console.log(error);
            });

        //get data about user
        let id = localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(res=> {
            this.setState({user: res.data});
            // console.log(response)
        })
            .catch(error => {
                console.log(error);
            });


        console.log(this.state._event);
    }

    render() {
        const {user} = this.state;

        return (
            <div>
                <div className="header">
                    <Link to={"/login"}>
                        <a>
                            <button className={"logOutButton"}>Log out</button>
                        </a>
                    </Link>
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
                            <hr></hr>

                            <h4
                                className="firstname_lastname_text"
                                aria-readonly={"true"}>
                                {this.state.user.firstname} {this.state.user.lastname}
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
                    <label className={"title"}>Event Details</label>
                </div>

                    <div  className="card" href="#event1">
                        <div className="card-body">

                            <a href={'/eventdetails'}> <h5 className="event-title">Event Title:{this.state._event.title}</h5></a>
                            <h4 className="event-category">Category:{this.state._event.category}</h4>
                            <h4 className="event-date">Date:{this.state._event.date}</h4>
                            <h4 className="event-duration">Duration:{this.state._event.duration}</h4>
                            <h4 className="event-location">Location:{this.state._event.location}</h4>
                            <h4 className="event-price">Price:{this.state._event.price}</h4>
                            <h4 className="event-description">Description:{this.state._event.description}</h4>

                            {/*<a href="#" className="btn btn-primary">Participate:{_event.participants}</a>*/}
                        </div>
                    </div>
                ))}



            </div>

        );
    }
}