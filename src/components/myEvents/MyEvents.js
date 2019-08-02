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
            eventId:'',
            currentPage:1,
            eventsPerPage: 5


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
        const {currentPage, eventsPerPage} = this.state;
        const lastPage = currentPage * eventsPerPage;
        const firstPage = lastPage - eventsPerPage;
        (this.state.currentPage === firstPage && currentPage!==Number.parseInt(this.state.events.length/eventsPerPage) )? this.setState({currentPage: lastPage}) : this.setState({currentPage: this.state.currentPage +1})
    };

    handleBack = () => {
        const {currentPage, eventsPerPage} = this.state;
        const lastPage = currentPage * eventsPerPage;
        (this.state.currentPage === lastPage && currentPage!==1 ) ? this.setState({currentPage: lastPage}) : this.setState({currentPage: this.state.currentPage - 1})

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
        ).then(response =>{
            for(let i=0;i<response.data.content.length;i++){
                let userId=localStorage.getItem('id');

                if(userId == response.data.content[i].userId) {
                    this.state.events.push(response.data.content[i]);
                }
        }           this.setState({events: this.state.events});


        })
            .catch(error => {
                console.log(error);
            });

        let id=localStorage.getItem('id');
        axios.get(
            'http://localhost:8080/user/' + id
        ).then(response => {
            this.setState({user: response.data});
        })
            .catch(error => {
                console.log(error);
            });
    }
    logout(){
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


                        <h4 className="event-date">Start date: {new Date(event.startdate).toUTCString().substring(0,22)}</h4>
                        {event.enddate ?
                            <h4 className="event-date">End date: {new Date(event.enddate).toUTCString().substring(0,22)}</h4>
                            : ""
                        }

                    </div>
                </div>
            )
        });



        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(!(events.length <= eventsPerPage)) {
                return (
                    <button className={(this.state.currentPage === number ? 'active' : '') + ' controls'} key={number}
                            id={number} onClick={this.handlePages}>
                        {number}
                    </button>
                );
            }});

        let nrOfPages;
        if(events.length % eventsPerPage ===0){
            nrOfPages=Number.parseInt(events.length/eventsPerPage);
        }else{
            nrOfPages=Number.parseInt(events.length/eventsPerPage)+1;
        }
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
                                    <a href="#">
                                        <span><i className="fa fa-bar-chart"></i></span>
                                        <span className={"dashboard-text"}> MY EVENTS</span>
                                    </a>
                                </Link>
                            </p>

                        </ul>
                    </nav>
                </div>
                <div>
                    <label className="top-label">MY EVENTS</label>
                </div>
                <div>
                    {this.state.events<1? <h3 className={"noEvents"}>There are not any events.</h3>:<ul>
                        {renderEvents}
                    </ul>}


                </div>
                <div className={"pagination"}>
                    <ul>
                        {(eventsPerPage <= this.state.events.length && currentPage>1)? <button className="lt" onClick={this.handleBack}>{left}</button> : ""}
                        {renderPageNumbers}
                        {(eventsPerPage <= this.state.events.length && currentPage!==nrOfPages )? <button className="rt" onClick={this.handleNext}>{right}</button> : ""}
                    </ul>
                </div>


            </div>


        )

    }
}


