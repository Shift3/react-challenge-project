import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import routeGuard from './route/routeGuard'
const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <routeGuard path="/order" exact component={OrderForm} />
       <Route path="/order/:id" component={OrderForm} />
      <routeGuard path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
}

export default AppRouter;
