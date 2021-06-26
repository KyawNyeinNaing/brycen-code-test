import Head from 'next/head'
import Link from 'next/link'

const Layout = ({ title, keyword, desc, children }) => {
	return (
		<article className="layout">
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='keywords' content={keyword} />
				<meta name='description' content={desc} />
				<meta charSet='utf-8' />
				<title>{title}</title>
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				<header>
					<ul>
						<li>
							<Link href='/'>Employee</Link>
						</li>
						<li>
							<Link href='/user'>User</Link>
						</li>
					</ul>
				</header>
			</main>
			{children}
		</article>
	);
}

Layout.defaultProps = {
	title: 'My Porifolio',
	keyword: 'Web Development, Programming',
	desc: 'Get the latest news in web dev'
}

export default Layout
