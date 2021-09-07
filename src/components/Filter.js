
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

  componentDidMount(){
    this.props.fetchBrands();
  }


  onChange(e, slug) {
    if(e.currentTarget.checked) {
      this.state.selected.push({manufacturer: slug});
      document.getElementById('all').checked = false;
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
  unCheckAll () {
    this.props.fetchProducts(1, 16, this.props.sort, this.props.order);
    var checks = document.querySelectorAll('input[class="brand-checkbox"]');
    for(var i =0; i< checks.length;i++){
        var check = checks[i];
        check.checked = false;
    }
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
          <label><input id="all" value="all" type="checkbox"
                onChange={ (e) => e.currentTarget.checked ? this.unCheckAll()
                : undefined} />All</label>
            {this.props.brands.map((brand) => (    
              <label><input 
                onChange={ (e) => this.onChange(e, brand.slug) }
                id={brand.slug} className="brand-checkbox" type="checkbox" value={brand.slug} /> {brand.name}</label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    brands: state.products.brands,
    products: state.products.items,
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