import React, {Component} from "react";
import './newEvent.css';
import logo from './face-0.png';
import {Link} from "react-router-dom";
import axios from 'axios'
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export default class NewEvent extends Component {


    render() {

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
                                className="name_surname_text"
                            >
                                Name Surname
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
                    <label className={"title"}>Create Event</label>
                </div>
                <div className="profile-card" href="#profile">

                    <div className="logo-img">
                        {/*<img src={logo} alt="logo"/>*/}
                        <hr></hr>
                        {/*<img className="card-img-top" src="..." alt="Card image cap"/>*/}
                        <div className="profile-card-body">
                            <FormGroup controlId="event-title">
                                <ControlLabel>Title</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="event-title" placeholder="Event title"/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="Description">
                                <ControlLabel>Description</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="description" placeholder="Description"/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="date">
                                <ControlLabel>Date</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="date" placeholder='Enter date'/>
                                </div>
                            </FormGroup>
                            <FormGroup controlId="duration">
                                <ControlLabel>Duration</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="duration" placeholder="Enter duration"/>
                                </div>
                            </FormGroup>
                            <div className="form-group">
                                <label htmlFor="sell">Category</label>
                                <div className="col-sm-5">
                                    <select className="form-control" id="sel1">
                                        <option>Education</option>
                                        <option>Sport</option>
                                        <option>Party</option>

                                    </select>
                                </div>
                            </div>
                            <FormGroup controlId="price">
                                <ControlLabel>Price</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="price" placeholder='Enter price'/>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="location">
                                <ControlLabel>Location</ControlLabel>
                                <div className="col-sm-5">
                                    <FormControl type="text" name="location" placeholder='Enter location'/>
                                </div>
                            </FormGroup>
                            <hr></hr>
                            <a href="/dashboard" className="btn btn-primary">Create</a>

                        </div>
                    </div>
                </div>


            </div>


        )

    }
}


