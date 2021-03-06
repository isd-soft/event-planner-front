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
            location: ""

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
        })
            .catch(error => {
                console.log(error);
            });
    }
    submitHandler = e => {
        e.preventDefault()

        if ((Date.parse(this.state.startdate) >= Date.parse(this.state.enddate))) {
            swal("Error!", "End date should be greater than Start date", "error");
            return;
        }

        axios.post("http://localhost:8080/events", this.state)
            .then(response => {
                swal("Event created!", "Event was successfully created!", "success");
                this.props.history.push("/dashboard");
            })
            .catch(error => {
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
                    <label className="top-label">CREATE EVENT</label>
                </div>
                <div className={"card-event"}>
                <div className="card-new-event">
                    <form className="form-horizontal" onSubmit={this.submitHandler}>

                                <FormGroup controlId="event-title">
                                    <div className="col-sm-5">
                                        <ControlLabel>* Title</ControlLabel>
                                        <FormControl type="text" name="title" placeholder="Enter event title"
                                                     value={title} onChange={this.changeHandle} required/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="Enter description">
                                    <div className="col-sm-5">
                                        <ControlLabel>Description</ControlLabel>
                                        <textarea className="form-control" rows="5" id="comment" name="description" placeholder="Description"
                                                  value={description} onChange={this.changeHandle}></textarea>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="startdate_enddate">
                                    <div className="col-sm-5">
                                        <ControlLabel>* Start Date</ControlLabel>
                                        <FormControl type="datetime-local" name="startdate" placeholder='Enter date'
                                                     value={startdate} onChange={this.changeHandle} required/>
                                        <h6 >Please introduce the date and time completely.</h6>
                                    </div>
                                    <div className="col-sm-5">
                                        <ControlLabel>End Date</ControlLabel>
                                        <FormControl type="datetime-local" name="enddate" placeholder='Enter date'
                                                     value={enddate} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="category">
                                    <div className="col-sm-5">
                                        <ControlLabel>Category</ControlLabel>
                                        <FormControl type="text" name="category" placeholder="Enter category of event"
                                                     value={category} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="price">
                                    <div className="col-sm-5">
                                        <ControlLabel>Price</ControlLabel>
                                        <FormControl type="text" name="price" placeholder='Enter price'
                                                     value={price} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="location">
                                    <div className="col-sm-5">
                                        <ControlLabel>Location</ControlLabel>
                                        <FormControl type="text" name="location" placeholder='Enter location'
                                                     value={location} onChange={this.changeHandle}/>
                                    </div>
                                </FormGroup>


                                        <button type="submit" href="/dashboard" className="btn btn-primary">Create</button>

                    </form>

                </div>
                </div>
            </div>
        )

    }
}


