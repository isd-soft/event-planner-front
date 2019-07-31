import React from "react";
import { Route, Redirect } from "react-router-dom";
import userActions from '../actions/user.actions'

export const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {
    return (
        <Route
            {...rest}
            render={props => {
                console.log(localStorage.getItem("jwtToken"))
                if (localStorage.getItem("jwtToken")!=null) {

                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
