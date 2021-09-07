import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart, addToCart } from "../actions/cartActions";

class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li className="product" key={item.slug}>
                    <div>
                      <div className="product-info">
                        <div className="product-name">{item.name}</div>
                        <div className="product-price">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                      <div className="cart-addremove">
                        <button
                          className="cart-button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          -
                        </button>
                        <span className="cart-total">{item.count}</span>
                        <button
                          className="cart-button"
                          onClick={() => this.props.addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                      {cartItems.length > 1 && (
                        <hr className="cart-border"></hr>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
            {cartItems.length !== 0 && (
                  <div className="product-price" style={{float: "right"}}>
                          {formatCurrency(
                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                          )}
                  </div>
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, addToCart }
)(Cart);