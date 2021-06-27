import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Router, { withRouter } from "next/router";
import { Header, Layout } from "@/src/components";

const Product = (props) => {
  const { totalCount, pageCount, currentPage, perPage, posts, router } = props;
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  console.log(props)
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const pagginationHandler = (page) => {
    const currentPath = router?.pathname;
    const currentQuery = { ...props?.router.query };
    currentQuery.page = page?.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <Layout title='Product'>
      <Header />
      <Row>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          posts?.map(product => (
            <Col space='4'>
              <div className="card" key={product?.id}>
                <img src={product?.image} alt="card image" />
                <div className="card-body">
                  <h5 className="card-title">{product?.name}</h5>
                  <p className="card-text">{product?.description}</p>
                </div>
              </div>
            </Col>
          ))
        )}

        <Col space='12'>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={"active"}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            initialPage={currentPage - 1}
            pageCount={pageCount} //page count
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={pagginationHandler}
          />
        </Col>
      </Row>
    </Layout>
  );
};

Product.getInitialProps = async ({ query }) => {
  const page = query?.page || 1;
  const posts = await axios.get(
    `https://gorest.co.in/public-api/products?page=${page}`
  );

  return {
    totalCount: posts?.data?.meta?.pagination?.total,
    pageCount: posts?.data?.meta?.pagination?.limit,
    currentPage: posts?.data?.meta?.pagination?.page,
    perPage: posts?.data?.meta?.pagination?.pages,
    posts: posts?.data?.data,
    isLoading: false,
  };
};

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
