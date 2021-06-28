import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/src/icons";
import { Pagination } from "@/src/components";
import {
  setModalOpen,
  fetchProducts,
  deleteProduct,
  setSelectedProduct,
} from "@/src/store";

const Table = () => {
  const [current, setCurrent] = useState(1);
  const state = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts({
        page_number: current || "",
        product_per_page: 5,
      })
    );
  }, [dispatch, current]);

  const onChangePaginate = (e) => {
    setCurrent(e);
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>#</th>
          <th>Process Title</th>
          <th>Sub Process Name</th>
          <th>Sub Process Version</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody className="table__body">
        {state.productList.map((list, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{list.process_title}</td>
            <td>{list.sub_process_name}</td>
            <td>{list.sub_process_version}</td>
            <td style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <button
                className="btn btn__compact btn__edit mr-2"
                onClick={() => {
                  dispatch(setSelectedProduct(list._id));
                  dispatch(setModalOpen(true));
                }}
              >
                <PencilSVG />
              </button>
              <button
                className="btn btn__compact btn__delete"
                onClick={() => {
                  dispatch(deleteProduct(list._id));
                }}
              >
                <TrashSVG />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">
            <Pagination
              onChange={onChangePaginate}
              current={current}
              total={state?.productList?.length}
              defaultPageSize={1}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
