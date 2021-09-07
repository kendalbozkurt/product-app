import React, { Component } from "react";
import formatCurrency from "../utils";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import ReactPaginate from "react-paginate";

class Products extends Component {
    constructor(props) {
      super(props);
      this.state = {
        product: null,
      };
    }
    componentDidMount(){
      this.props.fetchProducts();
    }

    render() {
        return (
           <div>
              {!this.props.products ? (
              <div>Loading...</div>
              ) : (
                <div>
                <h4>Products</h4>
                <button className="button filter-button">Mug</button>
                <button className="button filter-button">Shirt</button>
                <ul className="products">
                  {this.props.products.map((product) => (
                  <li key={product.slug}>
                    <div className="product">
                      <div className="product-bg">
                        <img src="/images/dress1.jpg" alt={product.name}></img>
                      </div>
                      <div className="product-price">
                        {formatCurrency(product.price)}
                      </div>
                      <p className="product-name">{product.name}</p>
                      <button
                          className="button primary"
                          onClick={() => {
                            this.props.addToCart(product);
                          }}
                        >
                          Add
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
              <ReactPaginate
                pageCount={Math.ceil(this.props.products.total / 16)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={(data) => this.props.fetchProducts(data.selected + 1, 16, this.props.sort, this.props.order)}
                containerClassName={"pagination"}
              />
              </div>
              )}
          </div>
        )
    }
}

export default connect((state) => ({
  products: state.products.filteredItems,
  sort: state.products.sort,
  page: state.products.page,
  order: state.products.order
}), {fetchProducts,  addToCart})( Products);