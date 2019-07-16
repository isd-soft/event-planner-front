import React, { Component } from "react";
import {  Navbar } from 'react-bootstrap';
import './dashboard.css';
import {  Route, Link } from "react-router-dom";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // classes: "dropdown show-dropdown open",
            // bg_checked: true,
            bgImage: this.props.bgImage,
            avatar: this.props.avatar,
            username: this.props.username
        };
    }
    render() {
        return (
            <div>


            <div className="header">
                <div className="logo">
                    <i className="fa fa-tachometer"></i>
                    <span>ISD Events</span>
                </div>
                <a href="#" className="nav-trigger"><span></span></a>
            </div>
            <div className="side-nav">
                <div className="author">
                    <a href="#changePhoto">
                        <img
                            // className="avatar border-gray"
                            // src={this.props.avatar}
                             src="C:\Users\danna\Desktop\event-planner-front\src\default-avatar.png"
                        />
                        <h4 className="title">
                            {this.props.username}
                            <br />
                            <small>{this.props.username}</small>
                        </h4>
                    </a>
                </div>
                <div className="logo">
                    {/*<i className="logo"></i>*/}
                    <span>Name Surname</span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="#">
                                <span><i className="fa fa-user"></i></span>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">

                                <span><i className="fa fa-envelope"></i></span>
                                <span>My profile</span>
                            </a>
                        </li>
                        <li >
                            <a href="#">
                                <span><i className="fa fa-bar-chart"></i></span>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span><i className="fa fa-credit-card-alt"></i></span>
                                <span>Log out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            </div>

        );
    }
}





