import React, {Component} from "react";
import './dashboard.css';
import logo from './face-0.png';
import {Link} from "react-router-dom";
import axios from 'axios'

require("bootstrap/less/bootstrap.less");

export default class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user:{},
            events: [],
            eventId: '',
            currentPage: 1,
            eventsPerPage: 10,


        }
        this.handlePages = this.handlePages.bind(this);

    }

    handleClick(value) {
        localStorage.setItem("eventId", value);

    }

    handlePages = (e) => {
        this.setState({
            currentPage: Number(e.target.id)

        });
    }


    handleNext = () => {
        this.state.currentPage === 417 ? this.setState({currentPage: 1}) : this.setState({currentPage: this.state.currentPage + 1})
    };

    handleBack = () => {
        this.state.currentPage === 1 ? this.setState({currentPage: 417}) : this.setState({currentPage: this.state.currentPage - 1})
    };

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
            'http://localhost:8080/events'
        ).then(response => {
            this.setState({events: (response.data.content).reverse()});
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
        localStorage.clear()
    }


    render() {

        const left = '<';
        const right = '>';
        const {currentPage, eventsPerPage, events} = this.state;
        const lastPage = currentPage * eventsPerPage;
        const firstPage = lastPage - eventsPerPage;

        const renderEvents = events.slice(firstPage, lastPage).map((event) => {
            return (

                <div className="card" href="#event1">
                    <div className="card-body">

                        <a href={"/eventdetails"} onClick={() => this.handleClick(event.id)}><h5
                            className="event-title">{event.title}</h5></a>
                        {event.category ?
                            <h4 className="event-category">Category: {event.category}</h4>
                            : ""
                        }
                        <h4 className="event-date">Start date: {new Date(event.startdate).toUTCString()}</h4>
                        {event.enddate ?
                            <h4 className="event-date">End date: {new Date(event.enddate).toUTCString()}</h4>
                            : ""
                        }
                    </div>
                </div>
            )
        });


        const numbers = [];
        if (this.state.currentPage === 414) {
            for (let i = this.state.currentPage - 1; i <= this.state.currentPage + 3; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage === 415) {
            for (let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage === 416) {
            for (let i = this.state.currentPage - 3; i <= this.state.currentPage + 1; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage === 417) {
            for (let i = this.state.currentPage - 4; i <= this.state.currentPage; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage >= 3) {
            for (let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage === 2) {
            for (let i = this.state.currentPage - 1; i <= this.state.currentPage + 3; i++) {
                numbers.push(i);
            }
        } else if (this.state.currentPage === 1) {
            for (let i = this.state.currentPage; i <= this.state.currentPage + 4; i++) {
                numbers.push(i);
            }
        }

        const renderPagination = numbers.map(number => {
            return (
                <button className={(this.state.currentPage === number ? 'active' : '') + ' controls'} key={number}
                        id={number} onClick={this.handlePages}>
                    {number}
                </button>
            );
        });

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
                            >
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
                                <Link to={"/create"}>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}>CREATE EVENT</span>
                                </Link>
                            </p>

                            <br></br>

                            <p>
                                <Link to={"/myevents"}>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}> MY EVENTS</span>
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className="top-label">THE LIST OF EVENTS</label>
                </div>

                <div>
                    <ul>
                        {renderEvents}
                    </ul>


                </div>
                <div className={"pagination"}>
                    <ul>
                        <button className="lt" onClick={this.handleBack}>{left}</button>
                        {renderPagination}
                        <button className="rt" onClick={this.handleNext}>{right}</button>
                    </ul>
                </div>

            </div>


        )

    }
}


