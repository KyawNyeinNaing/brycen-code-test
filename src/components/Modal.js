import { useEffect } from "react"
import ReactDOM from "react-dom"

import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import cx from "clsx"

import { CheckSVG, CloseSVG } from "@/src/icons"
import {
	addProduct,
	setModalOpen,
	setSelectedProduct,
	updateProduct,
} from "@/src/store"



export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm()

	const product = useSelector(state => state.product)

	const dispatch = useDispatch()

	const closeModal = () => {
		reset()
		dispatch(setModalOpen(false))
		dispatch(setSelectedProduct(undefined))
	}

	const onSubmitHandler = data => {
		console.log(data)
		if (data) {
			closeModal()
		}
		if (product.selectedProduct) {
			dispatch(
				updateProduct({
					_id: product.selectedProduct._id,
					...data,
				})
			)
		} else {
			dispatch(addProduct(data))
		}
	}

	useEffect(() => {
		if (product.selectedProduct) {
			setValue("name", product.selectedProduct.name)
			setValue("email", product.selectedProduct.email)
			setValue("address", product.selectedProduct.address)
			setValue("phone", product.selectedProduct.phone)
			setValue("parent", product.selectedProduct.parent)
		}
	}, [product.selectedProduct, setValue])

	return product.isModalOpen
		? ReactDOM.createPortal(
			<div className="modal">
				<div className="modal__content">
					<header className="header modal__header">
						<h1 className="header__h2">
							{product.selectedProduct ? (
								<>
									Edit <span>Employee</span>
								</>
							) : (
								<>
									Add <span>Employee</span>
								</>
							)}
						</h1>
						<button
							className="btn btn__compact btn__close"
							onClick={closeModal}
						>
							<CloseSVG />
						</button>
					</header>

					<form
						className="form modal__form"
						onSubmit={handleSubmit(onSubmitHandler)}
						noValidate
					>
						<div className="form__element">
							<label
								htmlFor="nameInput"
								className={cx("label", errors.name && "label--error")}
							>
								{errors.name ? (
									"Full name is required!"
								) : (
									<>
										Process Title	<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="text"
								id="nameInput"
								name="name"
								placeholder="Full name"
								className={cx("input", errors.name && "input--error")}
								ref={register({ required: true })}
							/>
						</div>

						<div className="form__element">
							<label
								htmlFor="emailInput"
								className={cx("label", errors.email && "label--error")}
							>
								{errors.email ? (
									`${errors.email.message}`
								) : (
									<>
										Email&nbsp	<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="email"
								id="emailInput"
								name="email"
								placeholder="Email"
								className={cx("input", errors.email && "input--error")}
								ref={register({
									required: "Email is required!",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: "Invalid email address!",
									},
								})}
							/>
						</div>

						<div className="form__element">
							<label
								htmlFor="addressArea"
								className={cx("label", errors.address && "label--error")}
							>
								{errors.address ? (
									"Address is required!"
								) : (
									<>
										Address&nbsp	<span className="label__required">*</span>
									</>
								)}
							</label>
							<textarea
								type="text"
								id="addressArea"
								name="address"
								placeholder="Address"
								className={cx("area", errors.address && "input--error")}
								ref={register({ required: true })}
							/>
						</div>

						<div className="form__element">
							<label
								htmlFor="phoneNumber"
								className={cx("label", errors.phone && "label--error")}
							>
								{errors.phone ? (
									`${errors.phone.message}`
								) : (
									<>
										Phone&nbsp	<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="number"
								id="phoneNumber"
								name="phone"
								placeholder="Phone"
								className={cx("input", errors.phone && "input--error")}
								ref={register({
									required: "Phone is required!",
									minLength: {
										value: 11,
										message: "Minimum of 11 digits",
									},
									maxLength: {
										value: 12,
										message: "Maximum of 12 digits",
									},
								})}
							/>
						</div>

						<div className="form__element">
							<label
								htmlFor="parentInput"
								className={cx("label", errors.name && "label--error")}
							>
								{errors.name ? (
									"Parent name is required!"
								) : (
									<>
										Parent Name&nbsp	<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="text"
								id="parentInput"
								name="parent"
								placeholder="Parent Name"
								className={cx("input", errors.parent && "input--error")}
								ref={register({ required: true })}
							/>
						</div>

						<div className="form__action">
							<button
								className="btn btn__icon btn__cancel"
								type="button"
								onClick={closeModal}
							>
								<CloseSVG /> Cancel
								</button>
							<button className="btn btn__primary btn__icon" type="submit">
								<CheckSVG /> {product.selectedProduct ? "Update" : "Submit"}
							</button>
						</div>
					</form>
				</div>
			</div>,
			document.body
		)
		: null
}
