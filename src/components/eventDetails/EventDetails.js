import React, {Component} from "react";
import './eventDetails.css';
import logo from './face-0.png';
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';


export default class EventDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            eventOrganizer: {},
            event: {},
            answer: '',
            coming:[],
            maybe:[],
            notComing:[],
            thisUserIsEventOrganiser: true
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
        let eventId = localStorage.getItem('eventId');
        let id = localStorage.getItem('id');

        //get data about event
        axios.get(
            'http://localhost:8080/events/' + eventId
        ).then(response => {
            this.setState({event: response.data});
            let organiserId = response.data.userId;
            if (id != organiserId) {
                this.setState({thisUserIsEventOrganiser: false})
            }
            axios.get(
                'http://localhost:8080/user/' + organiserId
            ).then(res => {
                this.setState({eventOrganizer: res.data});
            })
                .catch(error => {
                    console.log(error);
                });

        })
            .catch(error => {
                console.log(error);
            });

        //get data about user
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(res => {
            this.setState({user: res.data});
        })
            .catch(error => {
                console.log(error);
            });

        // GET LIST OF COMING USERS
        axios.post('http://localhost:8080/events/' + eventId + '/participants', {
            answer: "coming"
        }).then(res => {
                this.setState({coming: res.data});
            }
        )
            .catch(function (error) {
                console.log(error);
            });

        // GET LIST OF NOT COMING USERS
        axios.post('http://localhost:8080/events/' + eventId + '/participants', {
            answer: "not coming"
        }).then(res => {
                this.setState({notComing: res.data});
            }
        )
            .catch(function (error) {
                console.log(error);
            });

        // GET LIST OF MAYBE COMING USERS
        axios.post('http://localhost:8080/events/' + eventId + '/participants', {
            answer: "maybe"
        }).then(res => {
                this.setState({maybe: res.data});
            }
        )
            .catch(function (error) {
                console.log(error);
            });

    }

    handleEditEvent() {
        this.props.history.push("/editevent");
    }

    handleDeleteEvent() {
        swal({
            title: "Do you want to delete this event?",
            text: "You will not be able to undo this action!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    let eventId = localStorage.getItem('eventId');
                    axios.delete('http://localhost:8080/events/' + eventId).then(res => {
                            swal("Event has been deleted!", {
                                icon: "success",
                            });
                            this.props.history.push("/dashboard");
                        }
                    )
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });

    }

    handleOnComing() {
        let id = localStorage.getItem('id');
        6;
        let eventId = localStorage.getItem('eventId');
        axios.post('http://localhost:8080/events/' + eventId + '/participate', {
            answer: "coming"
        }).then(res => {
            }
        )
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    }

    handleOnNotComing() {
        let id = localStorage.getItem('id');
        let eventId = localStorage.getItem('eventId');
        axios.post('http://localhost:8080/events/' + eventId + '/participate', {
            answer: "not coming"
        }).then(res => {
            }
        )
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    }

    handleOnMaybeComing() {
        let id = localStorage.getItem('id');
        let eventId = localStorage.getItem('eventId');
        axios.post('http://localhost:8080/events/' + eventId + '/participate', {
            answer: "maybe"
        }).then(res => {
            }
        )
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    }

    logout() {
        localStorage.clear();
    }

    render() {
        // const {event} = this.state;

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
                                <Link to={"/myevents"}>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}> MY EVENTS</span>
                                </Link>
                            </p>
                            <br></br>


                            <p>
                                <Link to={"/create"}>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}>CREATE EVENT</span>
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className="top-label">EVENT DETAILS</label>
                </div>

                <div className="card1" href="#event1">

                    <div className="card-body1">
                        <div className="event-title">{this.state.event.title}</div>
                        {this.state.event.category ?
                            <h4 className="event-category">Category: {this.state.event.category}</h4>
                            : ""
                        }
                        <h4 className="event-date">Start date:{this.state.event.startdate}</h4>
                        <h4 className="event-date">End date: {this.state.event.enddate}</h4>
                        <h4 className="event-location">Location: {this.state.event.location}</h4>
                        <h4 className="event-price">Price: {this.state.event.price}</h4>
                        <h4 className="event-description">Description: {this.state.event.description}</h4>
                        <h4 className="event-description">Organizer: {this.state.eventOrganizer.firstname} {this.state.eventOrganizer.lastname}</h4>

                        {this.state.thisUserIsEventOrganiser ?
                            <div className="organize-buttons">
                                <button type="submit" className="btn btn-primary col-md-4"
                                        onClick={this.handleEditEvent.bind(this)}>Edit
                                </button>
                                <button type="submit" className="btn btn-danger col-md-6"
                                        onClick={this.handleDeleteEvent.bind(this)}>Delete
                                </button>
                            </div>
                            :
                            <div className="participation-buttons">
                                <button type="submit" className="btn btn-success col-md-4"
                                        onClick={this.handleOnComing.bind(this)}>Coming
                                </button>
                                <button type="submit" className="btn btn-danger col-md-4"
                                        onClick={this.handleOnNotComing.bind(this)}>Not coming
                                </button>
                                <button type="submit" className="btn btn-warning col-md-4"
                                        onClick={this.handleOnMaybeComing.bind(this)}>Maybe
                                </button>
                            </div>
                        }


                    {/*</div>*/}
                    </div>


                    <div class="card-group">

                        <div class="card-att">
                            <div class="card-header">COMING</div>
                            <div class="card-body-att">
                                {this.state.coming.map(user => (
                                    <h4 className="coming-user">{user.firstname} {user.lastname}</h4>
                                ))}
                            </div>
                        </div>

                        <div class="card-att">
                            <div class="card-header">MAYBE</div>
                            <div class="card-body-att">
                                {this.state.maybe.map(user => (
                                    <h4 className="maybe-coming-user">{user.firstname} {user.lastname}</h4>
                                ))}
                            </div>
                        </div>
                        <div className="card-att">
                            <div className="card-header">NOT COMING</div>
                            <div className="card-body-att">
                                {this.state.notComing.map(user => (
                                    <h4 className="not-coming-user">{user.firstname} {user.lastname}</h4>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        );
    }
}