import { Header, Layout, Modal, Table } from "@/src/components"	

const Home = () => {
	return (
		<div>
			<Layout title='Home'>
				<Header name='Product' />
				<Table />
				<Modal />
			</Layout>
		</div>
	)
}

export default Home