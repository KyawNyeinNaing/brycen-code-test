import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Router, { withRouter } from 'next/router'
import { Header, Layout } from '@/src/components'

const Product = props => {
  const { totalCount, pageCount, currentPage, perPage, posts, router } = props
  const [isLoading, setLoading] = useState(false)

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)

    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', stopLoading)
    }
  }, [])

  const pagginationHandler = page => {
    const currentPath = router?.pathname
    const currentQuery = { ...props?.router.query }
    currentQuery.page = page?.selected + 1

    router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }

  return (
    <Layout>
      <Header />
      <div className="container">
        <div className="posts">
          <CardContainer>
            {isLoading ? <span>Loading...</span> : posts?.map(post => (
              <div className='card'>
                <div key={post?.id}>{post?.title}</div>
                <div key={post?.id}>{post?.body}</div>
              </div>
            ))}
          </CardContainer>
        </div>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          activeClassName={'active'}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}

          initialPage={currentPage - 1}
          pageCount={pageCount} //page count
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={pagginationHandler}
        />
      </div>
    </Layout>
  )
}

Product.getInitialProps = async ({ query }) => {
  const page = query?.page || 1
  const posts = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`)

  return {
    totalCount: posts?.data?.meta?.pagination?.total,
    pageCount: posts?.data?.meta?.pagination?.limit,
    currentPage: posts?.data?.meta?.pagination?.page,
    perPage: posts?.data?.meta?.pagination?.pages,
    posts: posts?.data?.data,
    isLoading: false,
  }
}


export default withRouter(Product)

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 48%;
    border: 1px solid #ccc;
    margin: 0 10px 10px;
  }
`