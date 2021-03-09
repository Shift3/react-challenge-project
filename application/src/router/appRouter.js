import React from 'react';
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import { connect } from 'react-redux';


const protectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route{...rest} render={props => (
    !!auth.email && !!auth.token
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);
const mapStateToProps = (state) => ({ auth: state.auth });
const PrivateRoute = connect(mapStateToProps)(protectedRoute)

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <routeGuard path="/order" exact component={OrderForm} />
      <routeGuard path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
}

export default AppRouter;
