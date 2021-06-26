import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PencilSVG, TrashSVG } from '@/src/icons'
import {
	setModalOpen,
	fetchProducts,
	deleteProduct,
	setSelectedProduct,
} from '@/src/store'

const Table = () => {
	const state = useSelector(state => state.product);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Full name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Parent Name</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				
				{state.productList.map(list => (
					<tr key={list._id}>
						<td>{list.name}</td>
						<td>{list.email}</td>
						<td>{list.address}</td>
						<td>{list.phone}</td>
						<td>{list.parent}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
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
			</tbody>
		</table>
	)
}

export default Table
