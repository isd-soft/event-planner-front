import React, {Component} from "react";
import 'components/dashboard/dashboard.css';
import logo from 'components/dashboard/face-0.png';
import {Link} from "react-router-dom";
import axios from 'axios'


export default class MyEvents extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user:{},
            events: [],
            eventId:''


        }
    }
    handleClick(value) {
        localStorage.setItem("eventId", value);

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
        ).then(response =>{
            for(let i=0;i<response.data.content.length;i++){
                let userId=localStorage.getItem('id');
                console.log(userId == response.data.content[i].userId);

                if(userId == response.data.content[i].userId)

                {this.state.events.push(response.data.content[i]);
                    console.log(response.data.content.events);
                }
        }          this.setState({events: this.state.events});


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

        return (

            <div>
                <div className="header">
                    <Link to={"/login"}>
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

                            <br></br>

                            <p>
                                <Link to={"/myevents"}>
                                    <a href="#">
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span className={"dashboard-text"}> My Events</span>
                                    </a>
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className={"title"}>My Events</label>
                </div>
                <li>
                    {this.state.events.map(event => (<li key={event.id }>
                        <div className="card" href="#event1">
                            <div className="card-body">

                                <a  href={"/eventdetails"} onClick = {() => this.handleClick(event.id)}><h5 className="event-title">{event.title}</h5></a>
                                <h4 className="event-category">Category:{event.category}</h4>
                                <h4 className="event-date">Start date:{event.startdate}</h4>
                                <h4 className="event-date">End date:{event.enddate}</h4>

                                {/*<a href="#" className="btn btn-primary">Participate:{event.participants}</a>*/}
                            </div>
                        </div>
                    </li>))}

                </li>

            </div>


        )

    }
}


