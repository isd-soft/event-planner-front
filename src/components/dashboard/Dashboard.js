import React, {Component} from "react";
import {Pagination,} from 'react-bootstrap';
import './dashboard.css';
import userphoto from './face-0.png';
import {Route, Link} from "react-router-dom";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bgImage: this.props.bgImage,
            avatar: this.props.avatar,
            username: this.props.username,
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
                        <div className="userphoto">
                            <a
                                className="simple-text userphoto-mini"
                            >
                                <div className="userphoto-img">
                                    <img src={userphoto} alt="userphoto" />
                                </div>
                            </a>
                            <h4
                                className="name_surname_text"
                            >
                                 Name Surname
                            </h4>
                        </div>

                        {/*<a href="#changePhoto">*/}

                        {/*/!*<h4 className="title">*!/*/}
                        {/*/!*{this.props.username}*!/*/}
                        {/*/!*<br/>*!/*/}
                        {/*/!*<small>{this.props.username}</small>*!/*/}
                        {/*/!*</h4>*!/*/}
                        {/*</a>*/}
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
                            <p>
                                <Link to={"/profile"}>
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
                    <div className="card" href="#event3">
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
                    <div className="card" href="#event4">
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
                    <div className="card" href="#event5">
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

                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>

            </div>


        )
            ;
    }
}




