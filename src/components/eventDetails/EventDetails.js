import React, {Component} from "react";
import './eventDetails.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";
import axios from 'axios';


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
            notComing:[]
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

        //get data about event
        axios.get(
            'http://localhost:8080/events/' + eventId
        ).then(response => {
            this.setState({event: response.data});
            let organiserId = response.data.userId;
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
        let id = localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(res => {
            this.setState({user: res.data});
        })
            .catch(error => {
                console.log(error);
            });

        // //get data about COMING participants
        // axios.get(
        //     'http://localhost:8080/'
        // ).then(response => {
        //     this.setState({coming: response.data.content});
        //     console.log(response)
        // })
        //     .catch(error => {
        //         console.log(error);
        //     });
        //
        // //get data about MAYBE coming participants
        // axios.get(
        //     'http://localhost:8080/'
        // ).then(response => {
        //     this.setState({coming: response.data.content});
        //     console.log(response)
        // })
        //     .catch(error => {
        //         console.log(error);
        //     });
        //
        // //get data about NOT COMING participants
        // axios.get(
        //     'http://localhost:8080/'
        // ).then(response => {
        //     this.setState({notComing: response.data.content});
        //     console.log(response)
        // })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    handleOnGoing() {
        let id = localStorage.getItem('id');
        let eventId = localStorage.getItem('eventId');
        axios.post('http://localhost:8080/events/' + eventId + '/participate', {
            answer: "coming"
        }).then(res => {
                console.log(this.answer)
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnNotGoing() {
        let id = localStorage.getItem('id');
        let eventId = localStorage.getItem('eventId');
        axios.post('http://localhost:8080/events/' + eventId + '/participate', {
            answer: "not coming"
        }).then(res => {
                console.log(this.answer)
            }
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    logout(e) {
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
                                    {/*<a href="#">*/}
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}> MY EVENTS</span>
                                    {/*</a>*/}
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
                        </ul>
                    </nav>
                </div>
                <div>
                    <label className={"title"}>EVENT DETAILS</label>
                </div>

                <div className="card1" href="#event1">
                    <div className="card1-header">{this.state.event.title}</div>

                    <div className="card-body1">

                        {/*<a><h5 className="event-title">{this.state.event.title}</h5></a>*/}
                        <h4 className="event-category">Category: {this.state.event.category}</h4>
                        <h4 className="event-date">Start date:{this.state.event.startdate} at o'clock</h4>
                        <h4 className="event-date">End date: {this.state.event.enddate}</h4>
                        <h4 className="event-location">Location: {this.state.event.location}</h4>
                        <h4 className="event-price">Price: {this.state.event.price}</h4>
                        <h4 className="event-description">Description: {this.state.event.description}</h4>
                        <h4 className="event-description">Organizer: {this.state.eventOrganizer.firstname} {this.state.eventOrganizer.lastname}</h4>
                    {/*<div className={"attendance-buttons "}*/}
                        <button type="submit" className="btn btn-success col-sm-2"
                                onClick={this.handleOnGoing.bind(this)}>Going
                        </button>
                        <button type="submit" className="btn btn-danger col-sm-2" onClick={this.handleOnNotGoing.bind(this)}>Not
                            going
                        </button>
                        <button type="submit" className="btn btn-warning col-sm-2">Maybe</button>
                    {/*</div>*/}
                    </div>


                    <div class="card-group">

                        <div class="card-att">
                            <div class="card-header">COMING</div>
                            <div class="card-body-att">
                                    {/*{this.state.comings.map(coming => (<li key={coming.id}>*/}
                                        {/*<h5>{this.coming.userId}</h5>*/}
                                    {/*</li>*/}
                                    {/*))}*/}
                            </div>
                        </div>

                        <div class="card-att">
                            <div class="card-header">MAYBE</div>
                            <div class="card-body-att">
                                {/*{this.state.maybes.map(maybe => (<li key={maybe.id}>*/}
                                        {/*<h5>{this.coming.userId}</h5>*/}
                                    {/*</li>*/}
                                {/*))}*/}
                            </div>
                        </div>
                        <div className="card-att">
                            <div className="card-header">NOT COMING</div>
                            <div className="card-body-att">
                                {/*{this.state.notComings.map(notComing => (<li key={notComing.id}>*/}
                                        {/*<h5>{this.coming.userId}</h5>*/}
                                    {/*</li>*/}
                                {/*))}                       */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        );
    }
}