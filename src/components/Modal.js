import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/src/icons";
import {
  addProduct,
  setModalOpen,
  setSelectedProduct,
  updateProduct,
} from "@/src/store";

export function Modal() {
  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const closeModal = () => {
    reset();
    dispatch(setModalOpen(false));
    dispatch(setSelectedProduct(undefined));
  };

  const onSubmitHandler = (data) => {
    console.log(data);
    if (data) {
      closeModal();
    }
    if (product.selectedProduct) {
      dispatch(
        updateProduct({
          _id: product.selectedProduct._id,
          ...data,
        })
      );
    } else {
      dispatch(addProduct(data));
    }
  };

  useEffect(() => {
    if (product.selectedProduct) {
      setValue("process_title", product.selectedProduct.process_title);
      setValue("sub_process_name", product.selectedProduct.sub_process_name);
      setValue("sub_process_version", product.selectedProduct.sub_process_version);
      // setValue("address", product.selectedProduct.address)
      // setValue("phone", product.selectedProduct.phone)
      // setValue("parent", product.selectedProduct.parent)
    }
  }, [product.selectedProduct, setValue]);

  return product.isModalOpen
    ? ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__content">
          <header className="header modal__header">
            <h1 className="header__h2">
              {product.selectedProduct ? (
                <>
                  Edit <span>Product</span>
                </>
              ) : (
                <>
                  Add <span>Product</span>
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
                htmlFor="process_title"
                className={cx(
                  "label",
                  errors.process_title && "label--error"
                )}
              >
                {errors.process_title ? (
                  "process title is required!"
                ) : (
                  <>
                    Process Title <span className="label__required">*</span>
                  </>
                )}
              </label>
              <input
                type="text"
                id="process_title"
                name="process_title"
                placeholder="process title"
                className={cx("input", errors.name && "input--error")}
                ref={register({ required: true })}
              />
            </div>

            <div className="form__element">
              <label
                htmlFor="sub_process_name"
                className={cx(
                  "label",
                  errors.sub_process_name && "label--error"
                )}
              >
                {errors.sub_process_name ? (
                  "sub process name is required!"
                ) : (
                  <>
                    Sub Process Name{" "}
                    <span className="label__required">*</span>
                  </>
                )}
              </label>
              <input
                type="text"
                id="sub_process_name"
                name="sub_process_name"
                placeholder="sub process name"
                className={cx("input", errors.name && "input--error")}
                ref={register({ required: true })}
              />
            </div>

            <div className="form__element">
              <label
                htmlFor="sub_process_version"
                className={cx(
                  "label",
                  errors.sub_process_version && "label--error"
                )}
              >
                {errors.sub_process_version ? (
                  "sub process version is required!"
                ) : (
                  <>
                    Sub Process Version{" "}
                    <span className="label__required">*</span>
                  </>
                )}
              </label>
              <input
                type="text"
                id="sub_process_version"
                name="sub_process_version"
                placeholder="sub process version"
                className={cx("input", errors.name && "input--error")}
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
    : null;
}
