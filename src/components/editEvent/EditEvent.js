import React, {Component} from "react";
import './editEvent.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import axios from 'axios';
import swal from "sweetalert";


export default class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: ''
            },
            // events:[],
            // copyEvents:[]
            event: {
                title: null,
                description: "",
                category: "",
                startdate: null,
                enddate: null,
                price: "",
                location: ""
            },
            copyEvent: {
                title: null,
                description: "",
                category: "",
                startdate: null,
                enddate: null,
                price: "",
                location: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {copyEvent} = this.state;
        this.setState({
            copyEvent: {
                ...copyEvent,
                [name]: value  //see
            }
        });
    }

    handleSubmit = e => {
        let eventId = localStorage.getItem('eventId');
        e.preventDefault();
        const {copyEvent} = this.state;

        axios.put('http://localhost:8080/events/' + eventId, copyEvent
        )
            .then(response => {
                swal("Good job!", "The event details were updated!", "success");
                this.props.history.push("/eventdetails");

            })
            .catch(error => {
                swal("Oops!", "The event details were not updated!", "error");

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

        let eventId = localStorage.getItem('eventId');
        axios.get(
            'http://localhost:8080/events/' + eventId
        ).then(response => {
            this.setState({event: response.data});
            console.log(response.data);
        })
            .catch(error => {
                console.log(error);
            });

        axios.get(
            'http://localhost:8080/events/' + eventId
        ).then(response => {
            this.setState({copyEvent: response.data});
        })
            .catch(error => {
                console.log(error);
            });


        let id = localStorage.getItem('id');

        axios.get(
            'http://localhost:8080/user/' + id
        ).then(response => {
            this.setState({user: response.data});
        })
            .catch(error => {
                console.log(error);
            });

    }

    logout() {
        localStorage.clear();
    }

    render() {
        const {user, copyEvent} = this.state;

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
                    <label className={"title"}>EDIT EVENT</label>
                </div>
                <div className={"card-event"}>
                    <div className="card-new-event">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>

                            <FormGroup controlId="event-title">
                                <div className="col-sm-5">
                                    <ControlLabel>* Title</ControlLabel>
                                    <FormControl type="text" name="title" placeholder="Event title"
                                                 value={copyEvent.title} onChange={this.handleChange}/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="Description">
                                <div className="col-sm-5">
                                    <ControlLabel>Description</ControlLabel>
                                    <textarea className="form-control" rows="5" id="comment" name="description"
                                              placeholder="Description"
                                              value={copyEvent.description} onChange={this.handleChange}></textarea>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="startdate_enddate">
                                <div className="col-sm-5">
                                    <ControlLabel>* Start Date</ControlLabel>
                                    <FormControl type="datetime-local" name="startdate" placeholder='Enter date'
                                                 value={copyEvent.startdate} onChange={this.handleChange}/>
                                </div>
                                <div className="col-sm-5">
                                    <ControlLabel>End Date</ControlLabel>
                                    <FormControl type="datetime-local" name="enddate" placeholder='Enter date'
                                                 value={copyEvent.enddate} onChange={this.handleChange}/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="category">
                                <div className="col-sm-5">
                                    <ControlLabel>Category</ControlLabel>
                                    <FormControl type="text" name="category" placeholder="Enter category of event"
                                                 value={copyEvent.category} onChange={this.handleChange}/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="price">
                                <div className="col-sm-5">
                                    <ControlLabel>Price</ControlLabel>
                                    <FormControl type="text" name="price" placeholder='Enter price'
                                                 value={copyEvent.price} onChange={this.handleChange}/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="location">
                                <div className="col-sm-5">
                                    <ControlLabel>Location</ControlLabel>
                                    <FormControl type="text" name="location" placeholder='Enter location'
                                                 value={copyEvent.location} onChange={this.handleChange}/>
                                </div>
                            </FormGroup>


                            <button type="submit" href="/dashboard" className="btn btn-primary">Save changes</button>

                        </form>

                    </div>
                </div>
            </div>

        );
    }
}