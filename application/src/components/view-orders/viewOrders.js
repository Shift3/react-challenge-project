import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order?_id=`
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-orders/`


class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

/*
    general Idea is that we use the same form for createOrder filtered by the particular id which needs 
    to be edited/updated, Since i am not well versed with the React Js, i tried to implement this logic, 
    did not have sufficient understanding of the flow.

   editOrder(event) {
        event.preventDefault();
        if (this.state.order_item === "") return;
        fetch(EDIT_ORDER_URL + _id, {
            method: 'PUT',
            body: JSON.stringify({
                _id : this.state._id,
                order_item: this.state.order_item,
                quantity: this.state.quantity,
                ordered_by: this.props.auth.email,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));


    general Idea is that we filter by the particular id which needs to be delete , Since i am not well versed 
    with the React Js, i tried to implement this logic, did not have sufficient understanding of the flow.


    deleteOrder(_id)
    {
        if(window.confirm('are you sure ?'))
        {
        fetch(DELETE_ORDER_URL + _id,{
            method : 'POST',
            body: JSON.stringify({
                _id : this.state._id,
            }),
            headers :{
            'Content-Type' : 'application/json'}
            })
             .then(res => res.json())
             .then(response => console.log("Success", JSON.stringify(response)))
             .catch(error => console.error(error));
        }
        
    }
*/
    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()<10?'0':''}${createdDate.getMinutes()}:${createdDate.getSeconds()<10 ? '0' : ''}${createdDate.getSeconds()} `}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                    <button className="btn btn-success" onClick={(event) => this.editOrder(event)} >Edit</button>
                                    <button className="btn btn-danger" onClick={(_id)=>this.deleteOrder(order._id)}>Delete</button> 
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
