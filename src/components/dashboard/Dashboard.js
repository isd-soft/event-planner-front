import React, {Component} from "react";
import {Pagination,} from 'react-bootstrap';
import './dashboard.css';
import 'components/myProfile/myProfile.css'
import logo1 from './face-0.png';
import logo from './dashboard-icon.png'
import {Route, Link} from "react-router-dom";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Speianu",
            surname: "Dana"
            // title: this.state.title,
            // category:this.state.category,
            // date: this.state.date,
            // duration: this.state.duration,
            // location:this.state.location,
            // price:this.state.price
        };
    }


    render() {
        return (
            <div>
                <div className="header">
                    <Link to={"/login"}>
                        <a><button className={"logOutButton"}>Log out</button></a>
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
                                    <img src={logo1} alt="logo1"/>
                                </div>
                            </a>

                            <h4
                                className="name_surname_text"
                            >
                                {this.state.name} {this.state.surname}
                            </h4>

                        </div>

                    </div>
                    <nav>
                        <ul>
                            <p>
                                {/*<div className={"dashboard-icon"}>*/}
                                {/*<img src={logo} className={"dashboard_icon"} alt="logo"/>*/}
                            {/*</div>*/}
                                <Link to={"/dashboard"} className={"dashboard-text"}>
                                        <hr></hr>
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
                                        <span className={"dashboard-text"}> My Profile</span>
                                    </a>
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className={"title"}>The list of events</label>
                </div>
                <li>
                    <div className="card" href="#event1">
                        {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                        <div className="card-body">
                            <h5 className="event-title">Event Title</h5>
                            <h4 className="event-category">Category:</h4>
                            <h4 className="event-date">Date:</h4>
                            <h4 className="event-duration">Duration:</h4>
                            <h4 className="event-location">Location:</h4>
                            <h4 className="event-date">Price:</h4>
                            <a href="#" className="btn btn-primary">Participate</a>
                        </div>
                    </div>
                    <div className="card" href="#event2">
                        {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                        <div className="card-body">
                            <h5 className="event-title">Event Title</h5>
                            <h4 className="event-category">Category:</h4>
                            <h4 className="event-date">Date:</h4>
                            <h4 className="event-duration">Duration:</h4>
                            <h4 className="event-location">Location:</h4>
                            <h4 className="event-date">Price:</h4>
                            <a href="#" className="btn btn-primary">Participate</a>
                        </div>
                    </div>
                </li>

            </div>


        )
            ;
    }
}




