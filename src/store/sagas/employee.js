import { put, takeLatest } from "redux-saga/effects"
import * as types from "@/src/store/types"

export function* fetchProducts() {
	try {
		const response = yield fetch("/api/employees")

		const employeeList = yield response.json()

		yield put({
			type: types.PRODUCT_FETCH_SUCCEEDED,
			payload: employeeList.data,
		})
	} catch (error) {
		yield put({
			type: types.PRODUCT_FETCH_FAILED,
			payload: error.message,
		})
	}
}

export function* watchFetchProducts() { // fetch all products
	yield takeLatest(types.PRODUCT_FETCH_REQUESTED, fetchProducts)
}

export function* addProduct(action) {
	try {
		const response = yield fetch("/api/employees", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newEmployee = yield response.json()

		yield put({
			type: types.PRODUCT_ADD_SUCCEEDED,
			payload: newEmployee.data,
		});
	} catch (error) {
		yield put({
			type: types.PRODUCT_ADD_FAILED,
			payload: error.message,
		})
	}
}

export function* watchAddProduct() { // add product
	yield takeLatest(types.PRODUCT_ADD_REQUESTED, addProduct)
}

export function* updateProduct(action) {
	try {
		const response = yield fetch(`/api/employees/${action.payload._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		})

		const updatedEmployee = yield response.json();

		yield put({
			type: types.PRODUCT_UPDATE_SUCCEEDED,
			payload: updatedEmployee.data,
		})
	} catch (error) {
		yield put({
			type: types.PRODUCT_UPDATE_FAILED,
			payload: error.message,
		})
	}
}

export function* watchUpdateProduct() { // update product
	yield takeLatest(types.PRODUCT_UPDATE_REQUESTED, updateProduct);
}

export function* deleteProduct(action) {
	try {
		const response = yield fetch(`/api/employees/${action.payload}`, {
			method: "DELETE",
		})

		const deletedEmployee = yield response.json();

		yield put({
			type: types.PRODUCT_DELETE_SUCCEEDED,
			payload: deletedEmployee.data.id,
		})
	} catch (error) {
		yield put({
			type: types.PRODUCT_DELETE_FAILED,
			payload: error.message,
		})
	}
}

export function* watchRemoveProduct() { // delete product
	yield takeLatest(types.PRODUCT_DELETE_REQUESTED, deleteProduct);
}