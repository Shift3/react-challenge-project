import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const AuthRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route { ...rest }>
            { auth.token 
                ? <Component />
                : <Redirect to={"/login"} />
            }
        </Route>
    )
}

export default connect(mapStateToProps, null)(AuthRoute); 