import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Modal from '../../components/Modal/Modal'
import Paginate from '../../components/Paginate/Paginate'
import CustomButton from '../../components/Button/CustomButton'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import  CustomTable from '../../components/Table/CustomTable'


const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }


  const closeModalHandler = () => {
     history.push('/')
  };

  return (
    <>
      <Modal
        show={true}
        onCancel={closeModalHandler}
        footer={<CustomButton to="/">CLOSE</CustomButton>}
      >
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <CustomTable>
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-lg'>
                          <i aria-hidden="true" className="black edit icon"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='light'
                      className='btn-lg'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i aria-hidden="true" className="red trash alternate outline icon"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            </CustomTable>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
      </Modal>
      
    </>
  )
}

export default ProductListScreen
