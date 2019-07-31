import React, {Component} from "react";
import './newEvent.css';
import logo from './face-0.png';
import {Link} from "react-router-dom";
import {isContainWhiteSpace, isEmail, isEmpty, isLength} from 'shared/validator';
import axios from 'axios'
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import swal from 'sweetalert';


export default class NewEvent extends Component {
    constructor(props) {

        super(props)
        this.state = {
            user:{},
            title: null,
            description: "",
            category: "",
            startdate: null,
            enddate: null,
            price: "",
            location: "",
            // participants: "",
            // organizers: ""
        }
    }


    changeHandle = e => {
        this.setState({[e.target.name]: e.target.value})


    }


    verificationHandler=e=>{
        if (isEmpty(this.title)) {
            console.log("Title is empty")

        }

        if (isEmpty(this.startdate)) {
            console.log("Start date is empty")

        }


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

        //get data about user
        let id = localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(res=> {
            this.setState({user: res.data});
            // console.log(response)
        })
            .catch(error => {
                console.log(error);
            });
    }
    submitHandler = e => {
        e.preventDefault()


       // this.verificationHandler();


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


        console.log(this.state)
        axios.post("http://localhost:8080/events", this.state)
            .then(response => {
                console.log(response)
                swal("Good job!", "Event was created!", "success");

            })
            .catch(error => {
                console.log(error)
                swal("Oops!", " The title and date are required!", "error");

            })
    }

    logout(){
        localStorage.clear();
    }

    render() {
        const {
            title, description, category, startdate, enddate,
            price, location, participants, organizers
        } = this.state

        return (

            <div>
                <div className="header">
                    <Link to={"/"}>

                        <button className={"logOutButton"} onClick={this.logout}>Log out</button>

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
                                className="name_surname_text"
                            >
                                {this.state.user.firstname}  {this.state.user.lastname}
                            </h4>
                            <br></br>

                        </div>
                    </div>
                    <nav>
                        <ul>
                            <p>
                                <Link to={"/dashboard"} className={"dashboard-text"}>
                                    {/*<a href="#">*/}
                                    <br></br>
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span><i className="fa fa-user"></i></span>
                                    <span className={"dashboard-text"}>DASHBOARD</span>
                                    {/*</a>*/}
                                </Link>
                            </p>
                            <br></br>

                            <p>
                                <Link to={"/profile"}>
                                    {/*<a href="#">*/}
                                    <span><i className="fa fa-bar-chart"></i></span>
                                    <span className={"dashboard-text"}> MY PROFILE</span>
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
                    <label className={"title"}>CREATE EVENT</label>
                </div>
                <div className="profile-card" href="#profile">

                            {/*Create Event -   form */}
                            <form  onSubmit={this.submitHandler}>

                                <FormGroup controlId="event-title">
                                    <ControlLabel>* Title</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="text" name="title" placeholder="Event title"
                                                     value={title} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="Description">
                                    <ControlLabel>Description</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="text" name="description" placeholder="Description"
                                                     value={description} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="startdate">
                                    <ControlLabel>* Start Date</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="datetime-local" name="startdate" placeholder='Enter date'
                                                     value={startdate} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="enddate">
                                    <ControlLabel>End Date</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="datetime-local" name="enddate" placeholder='Enter date'
                                                     value={enddate} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>


                                <FormGroup controlId="categoru">
                                    <ControlLabel>Category</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="text" name="category" placeholder="Enter duration"
                                                     value={category} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>


                                <FormGroup controlId="price">
                                    <ControlLabel>Price</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="text" name="price" placeholder='Enter price'
                                                     value={price} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="location">
                                    <ControlLabel>Location</ControlLabel>
                                    <div className="col-sm-5">
                                        <FormControl type="text" name="location" placeholder='Enter location'
                                                     value={location} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>
                                {/*<hr></hr>*/}

                                <button type="submit" href="/dashboard" className="btn btn-primary">Create</button>
                                {/*<a href="/dashboard" className="btn btn-primary">Create</a>*/}

                                {/*Event Form end*/}
                            </form>
                </div>
            </div>
        )

    }
}


