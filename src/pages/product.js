import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import axios from "axios"
import ReactPaginate from "react-paginate"
import Router, { withRouter } from "next/router"
import { Header, Layout } from "@/src/components"

const Product = (props) => {
  const { posts, router } = props

  console.log(props)
  const [isLoading, setLoading] = useState(false)

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)

    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])

  const paginationHandler = page => {
    const currentPath = router?.pathname
    const currentQuery = { ...props?.router.query }
    const per_page = 5
    currentQuery.page = page?.selected + 1 || 1
    currentQuery.per_page = per_page

    router.push({
      pathname: currentPath,
      query: currentQuery
    })
  }

  return (
    <Layout title='Product'>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Airline Name</th>
            <th>Country</th>
            <th>Head Quaters</th>
            <th>Website</th>
            <th>Established</th>
            <th>Trip Count</th>
          </tr>
        </thead>

        <tbody className="table__body">
          {isLoading ? (<span>Loading...</span>) : (
            posts?.data?.map((post, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>
                  <img src={post?.airline?.logo} alt={post?.name} style={{ width: '100%' }} />
                </td>
                <td>{post?.name}</td>
                <td>{post?.airline?.name}</td>
                <td>{post?.airline?.country}</td>
                <td>{post?.airline?.head_quaters}</td>
                <td>{post?.airline?.website}</td>
                <td>{post?.airline?.established}</td>
                <td>{post?.trips}</td>
              </tr>
            ))
          )}
          <tr>
            <td colspan="9">
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break"}
                activeClassName={"active"}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={paginationHandler}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  )
}

Product.getInitialProps = async ({ query }) => {
  const page = query?.page || 1
  const per_page = query?.per_page || 10
  const posts = await axios.get(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${per_page}`
  )

  return {
    posts: posts?.data,
    isLoading: false
  }
}

export default withRouter(Product)

const percent = (val) => Number(val / 12) * 100

const Row = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  display: flex;
  flex-wrap: wrap;
`

const Col = styled.div`
  width: 100%;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  ${({ space }) => space && css`
    width: ${percent(space)}%;
  `}
`
