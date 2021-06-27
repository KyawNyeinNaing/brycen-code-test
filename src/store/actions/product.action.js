import * as types from "@/src/store/types";

export const setModalOpen = (isModalOpen) => {
  return {
    type: types.MODAL_OPEN,
    payload: isModalOpen,
  };
};

export const fetchProducts = () => {
  // all
  return {
    type: types.PRODUCT_FETCH_REQUESTED,
  };
};

export const addProduct = (product) => {
  // add
  return {
    type: types.PRODUCT_ADD_REQUESTED,
    payload: product,
  };
};

export const setSelectedProduct = (id) => {
  // select
  return {
    type: types.PRODUCT_SELECTED,
    payload: id,
  };
};

export const updateProduct = (product) => {
  // update
  return {
    type: types.PRODUCT_UPDATE_REQUESTED,
    payload: product,
  };
};

export const deleteProduct = (id) => {
  // delete
  return {
    type: types.PRODUCT_DELETE_REQUESTED,
    payload: id,
  };
};
