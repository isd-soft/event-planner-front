import React, {Component} from "react";
// import {Navbar, Dropdown, NavDropdown} from 'react-bootstrap';
import './myProfile.css';
import logo from './face-0.png';
import {Route, Link} from "react-router-dom";

export default class MyProfile extends Component {


    render() {
        return (
            <div>
                <div className="header">
                    <Link to={"/login"}>
                        <a className={"logOutButton"}>
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
                    <label className={"title"}>My profile</label>
                </div>
                <div className="profile-card" href="#profile">

                    <div className="logo-img">
                        <img src={logo} alt="logo"/>

                        {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                        <div className="profile-card-body">
                            <h4 className="name">Name:</h4>
                            <h4 className="surname">Surname:</h4>
                            <h4 className="email">Email:</h4>
                            <h4 className="gender">Gender:</h4>
                            <h4 className="description">Description:</h4>
                            <h4 className="username">Username:</h4>
                            <a href="/edit" className="btn btn-primary">Edit</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}