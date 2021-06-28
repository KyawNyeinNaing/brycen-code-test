import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"

const Layout = ({ title, keyword, desc, children }) => {
  return (
    <article className="layout">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keyword} />
        <meta name="description" content={desc} />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <NavHeader>
          <ul>
            <li>
              <Link href="/">Product</Link>
            </li>
            <li>
              <Link href="/user">User</Link>
            </li>
            <li>
              <Link href="/product">Pagination</Link>
            </li>
          </ul>
        </NavHeader>
      </main>
      {children}
    </article>
  )
}

Layout.defaultProps = {
  title: "Code Test",
  keyword: "Web Development, Programming",
  desc: "Code Test",
}

export default Layout

const NavHeader = styled.header`
  background-color: #a7d0ff;
  padding: 10px;
  ul {
    list-style: none;
    display: flex;
    li {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
      a {
        text-decoration: none;
        color: #000000;
        font-weight: 600;
      }
    }
  }
`