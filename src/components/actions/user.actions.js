import axios from 'axios'
import {React,Component}from 'react'
class userActions extends Component{

    constructor(props) {
        super(props);
        this.state = {
           authenticated:false,

        }
        this.isAuthenticate=this.isAuthenticate().bind(this)

    }

    // login(username,password){
    //     axios.post('http://localhost:8080/authenticate', {
    //         username:username,
    //         password:password
    //     }).then(res=>{
    //         const token=res.data.token;
    //         if (token) {
    //           this.setState(this.authenticated=true)
    //             localStorage.setItem("jwtToken", token);
    //             // history.push('/dashboard')
    //             console.log(this.authenticated)
    //         }
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    isAuthenticate(flag){
        this.setState(this.authenticated=flag);
    };
}
export default  userActions;