import { FETCH_PRODUCTS, FETCH_BRANDS } from "../types";
export const fetchProducts = (page = 1, limit = 16, sort, order, params) => async (dispatch) => {
  let url = `/products?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  if (!!params) {
    for (const param of params) {
      var keys = Object.keys(param);
      for (const key of keys) {
        url += `&${key}=${param[key]}`;
      }
    }
  }

  const res = await fetch(url);
  const data = await res.json();
  data['total'] = res.headers.get('X-Total-Count');
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
    page: page,
    sort: sort,
    order: order,
    params: params
  });
};

export const fetchBrands = () => async (dispatch) => {
  const res = await fetch("/companies");
  const data = await res.json();
  dispatch({
    type: FETCH_BRANDS,
    payload: data,
  });
};
