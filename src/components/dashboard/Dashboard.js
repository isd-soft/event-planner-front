import React, {Component} from "react";
import './dashboard.css';
import logo from './face-0.png';
import {Link} from "react-router-dom";
import axios from 'axios'
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

export default class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user:{},
            events: [],
            eventId:'',
            currentPage:1,
            eventsPerPage: 10


        }
        this.handleClick1 = this.handleClick1.bind(this);

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    handleClick(value) {
        localStorage.setItem("eventId", value);

    }
    handleClick1(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
            'http://localhost:8080/events'
        ).then(response => {
            this.setState({events: response.data.content});
            //console.log(username);
            console.log(response)
        })
            .catch(error => {
                console.log(error);
            });

        let id=localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(response => {
            this.setState({user: response.data});
            console.log(response)
        })
            .catch(error => {
                console.log(error);
            });
    }
    logout(e){
        localStorage.clear()
}

    render() {
        const { events, currentPage, eventsPerPage } = this.state;
// Logic for displaying todos
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

        const renderEvents = currentEvents.map(event => (<li key={event.id}>
        <div className="card" href="#event1">
        <div className="card-body">

        <a  href={"/eventdetails"} onClick = {() => this.handleClick(event.id)}><h5 className="event-title">{event.title}</h5></a>
        <h4 className="event-category">Category:{event.category}</h4>
        <h4 className="event-date">Start date:{event.startdate.substring(0,10)} at {event.startdate.substring(11,16)} o'clock</h4>
        <h4 className="event-date">End date:{event.enddate}</h4>

        {/*<a href="#" className="btn btn-primary">Participate:{event.participants}</a>*/}
        </div>
        </div>
        </li>))


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick1}
                >
                    {number}
                </li>
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
                    <label className={"title"}>THE LIST OF EVENTS</label>
                </div>
                {/*<li>*/}

                    {/*{this.state.events.map(event => (<li key={event.id}>*/}
                        {/*<div className="card" href="#event1">*/}
                            {/*<div className="card-body">*/}

                                {/*<a  href={"/eventdetails"} onClick = {() => this.handleClick(event.id)}><h5 className="event-title">{event.title}</h5></a>*/}
                                {/*<h4 className="event-category">Category:{event.category}</h4>*/}
                                {/*<h4 className="event-date">Start date:{event.startdate.substring(0,10)} at {event.startdate.substring(11,16)} o'clock</h4>*/}
                                {/*<h4 className="event-date">End date:{event.enddate}</h4>*/}

                                {/*/!*<a href="#" className="btn btn-primary">Participate:{event.participants}</a>*!/*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</li>))}*/}

                {/*</li>*/}

                <div>
                    <ul>
                        {renderEvents}
                    </ul>
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>

            </div>


        )

    }
}


