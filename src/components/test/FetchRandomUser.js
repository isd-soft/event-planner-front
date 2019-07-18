// import React, {Component} from "react";
// import axios from 'axios';
// import setAuthorizationToken from 'service/AuthorizationToken'
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
//         axios.get("http://localhost:8080/all", setAuthorizationToken(localStorage.token)
//         )
//             .then(function (response) {
//
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