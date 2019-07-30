import React, { Component } from 'react';
import { Template } from '../../components';
import OrderItem from '../order-item/orderItem.js';
import './viewOrders.css';

const GET_ORDERS_URL = "http://localhost:4000/api/current-orders"

class ViewOrders extends Component {
    state = {
        orders: [],
    }


    getCurrentOrders() {
        fetch(GET_ORDERS_URL)
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
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map((order) => {
                        return (
                            <OrderItem
                                key={order._id}
                                orderId = {order._id}
                                orderItem = {order.order_item}
                                orderQuantity = {order.quantity}
                                getCurrentOrders = {this.getCurrentOrders.bind(this)}
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
