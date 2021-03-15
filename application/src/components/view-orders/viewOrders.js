import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';


const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`

class ViewOrders extends Component {
    state = {
        orders: [],
        editInfo: null
    }


    componentDidMount() {
        this.getCurrentOrders();
      }
    
      getCurrentOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              this.setState({ orders: response.orders });
            } else {
              console.log('Error getting orders');
            }
          })
          .catch((err) => console.error(err));
      }

    async deleteOrder(orderID) {
        let order_id = orderID
        await fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order_id
            }),
            headers: {
                'Content-type': 'application/json',
            }

        })
        .then((res) => {
            console.log(res)
            this.setState(this.getCurrentOrders())
        })
        .catch((err) => console.error(err));
    }

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
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" >Edit</button>
                                     <button className="btn btn-danger" onClick={this.deleteOrder.bind(this, order._id)}>Delete</button>
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
