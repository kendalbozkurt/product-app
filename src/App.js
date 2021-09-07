import React from 'react';
import logo from './logo.svg';
import basket from './basket.svg';
import formatCurrency from "./utils";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
    };

    store.subscribe(() => {

      this.setState({
        cartItems: store.getState().cart.cartItems,
      });
    });
  }
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <div className="cart-basket">
              <img src={basket} alt="basket" />
              <span className="header-cart-total"> {formatCurrency(
                      this.state.cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}</span>
            </div>
          </header>
          <main className="content">
            <div className="left-sidebar">
              <Filter />
            </div>
            <div className="main">
              <Products />
            </div>
            <div className="right-sidebar">
              <Cart />
            </div>
          </main>
          <footer>
            ©2019 Market • Privacy Policy
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
