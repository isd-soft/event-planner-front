// import React, {Component} from "react";
// import axios from 'axios';
//
// class FetchRandomUser extends Component {
//     state = {
//         loading: true,
//         id: null,
//         username: null,
//         password: null
//     };
//     picture;
//
//     //
//     async componentDidMount() {
//
//         axios.get("http://localhost:8080/all", {
//             headers: {
//                 "Content-Type":"application.json",
//                 "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE1NjMyODYxMDAsImlhdCI6MTU2MzI2ODEwMH0.EfbVpTVqRTRX5xSC3i-EtnFMuC3AU312JA3HVidy8PXle6FgcLzlQpSsjP2J8JkEHbeQMql4Kn77dBsVxMr9ZA "
//             }
//         })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//             .then(function () {
//                 // always executed
//             });
//     }
//
//     render() {
//         return (
//             <div className="App">
//                 <div>{this.state.token}</div>
//             </div>
//         );
//
//     }
//
//
// }
//
// export default FetchRandomUser;