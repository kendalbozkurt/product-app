
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts, fetchBrands } from "../actions/productActions";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  onChange(e, slug) {
    if(e.currentTarget.checked) {
      this.state.selected.push({manufacturer: slug});
    }else{
      this.state.selected = this.state.selected.filter(function(el) { return el.manufacturer != slug; }); 
    }
    this.props.fetchProducts(
      this.props.page,
      16,
      this.props.sort,
      this.props.order,
      this.state.selected,
    )
  }
  
  componentDidMount(){
    this.props.fetchBrands();
  }

  render() {
    return (!this.props.filteredProducts) ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-sort">
          <h2>Sorting</h2>
          <div className="sort-buttons" onChange={(e) =>
                this.props.fetchProducts(
                  this.props.page,
                  16,
                  e.target.value,
                  e.target.getAttribute("data-order"),
                  this.state.params
                )
              }>
            <label><input type="radio" value="price" data-order="asc" name="sorting" /> Price low to high</label>
            <label><input type="radio" value="price" data-order="desc" name="sorting" />  Price high to low</label>
            <label><input type="radio" value="added" data-order="desc" name="sorting" /> New to old</label>
            <label><input type="radio" value="added" data-order="desc" name="sorting" /> Old to new</label>
          </div>
        </div>
        <br></br>
        <div className="filter-brands">
          <h2>Brands</h2>
          <div className="brands">
            {this.props.brands.map((brand) => (    
              <label><input
                onChange={ (e) => this.onChange(e, brand.slug) }
                id={brand.slug} type="checkbox" value={brand.slug} /> {brand.name}</label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    products: state.products.items,
    brands: state.products.brands,
    filteredProducts: state.products.filteredItems,
    sort: state.products.sort,
    page: state.products.page,
    order: state.products.order,
    params: state.products.params
  }),
  {
    fetchBrands,
    fetchProducts
  }
)(Filter);