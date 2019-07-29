import React, { Component } from 'react';
import './orderItem.css';

const EDIT_ORDER_URL = "http://localhost:4000/api/edit-order"
const DELETE_ORDER_URL = "http://localhost:4000/api/delete-order"

export default class OrderItem extends Component {
  state = {
    isBeingEdited: false,
    wasEdited: false,
    updatedOrderItem: '',
    updatedQuantity: '',
  }

  handleEditButtonClick() {
    this.setState({ isBeingEdited: true })
  }

  handleUpdateButtonClick() {
    this.setState({
      isBeingEdited: false,
      wasEdited: true
    })
      fetch(EDIT_ORDER_URL, {
        method: 'POST',
        body: JSON.stringify({
            id: this.props.orderId,
            order_item: this.state.updatedOrderItem || this.props.orderItem,
            quantity: this.state.updatedQuantity || this.props.orderQuantity,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
      console.log("Success", JSON.stringify(response));
    })
    .catch(error => console.error(error));
    this.props.getCurrentOrders()
  }

  handleMenuItemChange(event) {
    this.setState({ updatedOrderItem: event.target.value });
  }

  handleItemQuantityChange(event) {
    this.setState({ updatedQuantity: event.target.value });
  }

  render() {
    const {orderId, orderItem, orderQuantity, createdDate, updatedAt} = this.props;
    // view rendered by default or after being edited
    if (this.state.isBeingEdited === false) {
      return (
        <div className="row view-order-container" id={orderId}>
          <div className="col-md-4 view-order-left-col p-3">
            <h2>{this.state.updatedOrderItem || orderItem}</h2>
          </div>
          <div className="col-md-4 d-flex view-order-middle-col">
            {/* Wording rendered depedning on whether or not the order was edited */}
            {createdDate !== updatedAt ?
            <p>Order updated at {`${updatedAt.getHours()}:${updatedAt.getMinutes()}`}</p> :
            <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}`}</p>
            }
            <p>Quantity: {this.state.updatedQuantity || orderQuantity}</p>
          </div>
          <div className="col-md-4 view-order-right-col">
            <button
              className="btn btn-success"
              onClick={() => {this.handleEditButtonClick()}}
            >
              Edit
            </button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      )
    } else {
      // view rendered if the item is being edited
      return (
        <div className="row view-order-container" id={orderId}>
          <div className="col-md-4 view-order-left-col p-3">
          <select
            value={this.state.updatedOrderItem || orderItem}
            onChange={(event) => this.handleMenuItemChange(event)}
            className="menu-select"
          >
              <option value="" defaultValue disabled hidden>Lunch menu</option>
              <option value="Soup of the Day">Soup of the Day</option>
              <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
              <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
              <option value="Chili Con Carne">Chili Con Carne</option>
          </select>
          </div>
          <div className="col-md-4 d-flex view-order-middle-col">
            <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
            <p>{`Quantity: `}</p>
            <select
              value={this.state.updatedQuantity || orderQuantity}
              onChange={(event) => this.handleItemQuantityChange(event)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="col-md-4 view-order-right-col">
            <button
              className="btn btn-success"
              onClick={() => {this.handleUpdateButtonClick()}}
            >
              Update
            </button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      )
    }
  }
}