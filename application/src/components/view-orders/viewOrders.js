import React, { Component } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import { Link } from "react-router-dom";
import "./viewOrders.css";

class ViewOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      edit: false,
      quantity: "",
    };
  }

  async componentDidMount() {
    await fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ orders: response.orders });
        } else {
          console.log("Error getting orders");
        }
      });
  }

  flipEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  deleteItem(e, order) {
    e.preventDefault();
    let orderIndex = this.state.orders.indexOf(order);
    fetch(`${SERVER_IP}/api/delete-order`, {
      method: "POST",
      body: JSON.stringify({
        id: this.state.orders[orderIndex]._id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.error(error));
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveEdit = (e, order) => {
    let orderIndex = this.state.orders.indexOf(order);
    fetch(`${SERVER_IP}/api/edit-order`, {
      method: "POST",
      body: JSON.stringify({
        id: this.state.orders[orderIndex]._id,
        quantity: this.state.quantity,
        order_item: this.state.orders[orderIndex].order_item,
        ordered_by: this.state.orders[orderIndex].ordered_by,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.error(error));
    this.setState({ edit: false });
  };

  render() {
    return (
      <Template>
        <div className="container-fluid">
          {this.state.orders.map((order) => {
            const createdDate = new Date(order.createdAt);
            return (
              <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                  <h2>{order.order_item}</h2>
                  <p>Ordered by: {order.ordered_by || ""}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                  <p>
                    Order placed at{" "}
                    {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}
                  </p>
                  {!this.state.edit ? (
                    <p>Quantity: {order.quantity}</p>
                  ) : (
                    <p>
                      Quantity:{" "}
                      <input
                        type="number"
                        name="quantity"
                        value={this.state.quantity}
                        placeholder={order.quantity}
                        onChange={this.handleChange}
                      />
                    </p>
                  )}
                </div>
                <div className="col-md-4 view-order-right-col">
                  {!this.state.edit ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => this.flipEdit(e, order)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => this.saveEdit(e, order)}
                    >
                      Save
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => this.deleteItem(e, order)}
                  >
                    Delete
                  </button>
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
