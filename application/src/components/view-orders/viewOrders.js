import React, { Component } from 'react';
import { Template } from '../../components';
import OrderItem from '../order-item/orderItem.js';
import './viewOrders.css';


class ViewOrders extends Component {
    state = {
        orders: [],
    }

    getCurrentOrders() {
        console.log('running');
        fetch('http://localhost:4000/api/current-orders')
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    componentDidMount() {
        this.getCurrentOrders()
    }

    render() {
    console.log(this.state);
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        console.log(order);
                        return (
                            <OrderItem
                                key={order._id}
                                orderId = {order._id}
                                orderItem = {order.order_item}
                                orderQuantity = {order.quantity}
                                getCurrentOrders = {() => this.getCurrentOrders}
                                updatedAt = {new Date(order.updatedAt)}
                                createdDate = {new Date(order.createdAt)}
                            />
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
