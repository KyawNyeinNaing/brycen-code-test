import { HYDRATE } from "next-redux-wrapper"
import * as types from "../types"

const initialState = {
	productList: [],
	selectedProduct: undefined,
	isModalOpen: false,
}

const product = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state, ...action.payload
			}

		case types.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			}
			
		case types.PRODUCT_FETCH_SUCCEEDED:
			return {
				...state,
				productList: action.payload,
			}
		case types.PRODUCT_ADD_SUCCEEDED:
			return {
				...state,
				productList: [
					action.payload, 
					...state.productList
				],
			}
		case types.PRODUCT_UPDATE_SUCCEEDED:
			const updatedEmployee = state.productList.map((employee) => {
				if (employee._id === action.payload._id) {
					return {
						...employee,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone
					}
				}
				return employee
			})

			return { ...state, productList: updatedEmployee }
		case types.PRODUCT_DELETE_SUCCEEDED:
			const newproductList = state.productList.filter(
				(employee) => employee._id !== action.payload
			)
			return {
				...state,
				productList: newproductList,
			}
		case types.PRODUCT_SELECTED:
			const selectedProduct = state.productList.find(
				(employee) => employee._id === action.payload
			)
			return {
				...state,
				selectedProduct,
			}
		default:
			return state
	}
}

export default product
