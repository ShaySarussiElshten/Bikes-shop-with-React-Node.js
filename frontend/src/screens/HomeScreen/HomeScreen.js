import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product/Product'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Paginate from '../../components/Paginate/Paginate'
import Meta from '../../components/Meta/Meta'
import { Container } from 'react-bootstrap'
import { listProducts } from '../../actions/productActions'
import HeaderVideo from '../../components/VideoHeader/videoHeader'



const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  return (
    <>
      {!keyword && <HeaderVideo />}
      <Container>
          <Meta />
          
          <h1>All Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {(products.length === 0 && keyword) ? 
                <div className="container text-center p-5">
                <div className="display-1">
                <i aria-hidden="true" className="search large icon"></i>
                  :(
                </div>
                <h1 className="mb-3">There is no search result...</h1>
                <div className="row justify-content-md-center">
                  <div className="col-md-6">
                  </div>
                </div>
              </div>
                
                :  
                products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                
              </Row>
            </>
          )}
      </Container>
      <Container>
      <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
      </Container>
    </>
  )
}

export default HomeScreen
