import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import Rating from '../../components/Rating/Rating'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import {listProductDetails,} from '../../actions/productActions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus,} from "@fortawesome/free-solid-svg-icons";
import CardFeaturedProduct from '../../components/Card/CardFeaturedProduct'
import CardServices from '../../components/Card/CardServices'
import ShippingReturns from '../../components/ShippingReturns/ShippingReturns'
import SizeChart from '../../components/SizeChart/SizeChart'
import { Tab } from 'semantic-ui-react'
import ReviewProduct from '../../components/ReviewProduct/ReviewProduct'



const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails


  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
    }
  }, [dispatch, match,product._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const panes = [
    { menuItem: 'Review', render: () => <Tab.Pane><ReviewProduct product={product} match={match} /></Tab.Pane> },
    { menuItem: 'Description', render: () => <Tab.Pane>{product.description}</Tab.Pane> },
    { menuItem: 'Shipping', render: () => <Tab.Pane><ShippingReturns/></Tab.Pane> },
    { menuItem: 'Size Chart', render: () => <Tab.Pane><SizeChart /></Tab.Pane> }
  ]



  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className="row py-4">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                  src={product.image} 
                  alt={product.name}
                  className="img-fluid mb-3"  
                />
              </div>
              <div className="col-md-7">
                <h1 className="h3 d-inline mr-2">
                     {product.name}
                </h1>
                <span className="badge bg-success mr-2">New</span>
                
                <div className="mb-3">
                   <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                  />
                </div>
                <dl className="row mb-3">
                  <dt className="col-sm-3">Availability</dt>
                  <dd className="col-sm-9">{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</dd>
                  <dt className="col-sm-3">Brand</dt>
                  <dd className="col-sm-9">{product.brand}</dd>
                  <dt className="col-sm-3">Category</dt>
                  <dd className="col-sm-9">
                      {product.category}
                  </dd>
                </dl>

                <div className="mb-3">
                  <span className="font-weight-bold h5 mr-2">${product.price}</span>
                  <del className="small text-muted mr-2">${product.price + 100}</del>
                  <span className="rounded p-1 bg-warning  mr-2 small">
                    -$100
                  </span>
                </div>
                <div className="mb-3">
                  <div className="d-inline float-left mr-2">
                    <div className="input-group input-group-sm mw-140">
                    <Form.Control
                            as='select'
                            value={qty}
                            style={{width:'5rem'}}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mr-2"
                    title="Add to cart"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                  
                </div>
                <div>
                  <p className="font-weight-bold mb-2">
                    Product Highlights
                  </p>
                  <ul className="">
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>Etiam ullamcorper nibh eget faucibus dictum.</li>
                    <li>Cras consequat felis ut vulputate porttitor.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                 <Tab panes={panes} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <CardFeaturedProduct />
            <CardServices />
          </div>
        </div> 
        </>
      )}

    </>
  )
}

export default ProductScreen
