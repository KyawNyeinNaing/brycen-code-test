import { HYDRATE } from "next-redux-wrapper";
import * as types from "../types";

const initialState = {
  productList: [],
  selectedProduct: undefined,
  isModalOpen: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    case types.MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };

    case types.PRODUCT_FETCH_SUCCEEDED:
      return {
        ...state,
        productList: action.payload,
      };
    case types.PRODUCT_ADD_SUCCEEDED:
      return {
        ...state,
        productList: [action.payload, ...state.productList],
      };
    case types.PRODUCT_UPDATE_SUCCEEDED:
      const updatedProduct = state.productList.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            process_title: action.payload.process_title,
            sub_process_name: action.payload.sub_process_name,
            sub_process_version: action.payload.sub_process_version,
          };
        }
        return product;
      });

      return { ...state, productList: updatedProduct };

    case types.PRODUCT_DELETE_SUCCEEDED:
      const newproductList = state.productList.filter(
        (employee) => employee._id !== action.payload
      );
      return {
        ...state,
        productList: newproductList,
      };
    case types.PRODUCT_SELECTED:
      const selectedProduct = state.productList.find(
        (employee) => employee._id === action.payload
      );
      return {
        ...state,
        selectedProduct,
      };
    default:
      return state;
  }
};

export default product;
