import { Header, Layout, Modal, Pagination, Table } from "@/src/components"	

const Home = () => {
	return (
		<div>
			<Layout title='Home'>
				<Header name='Product' />
				<Table />
				<Pagination />
				<Modal />
			</Layout>
		</div>
	)
}

export default Home