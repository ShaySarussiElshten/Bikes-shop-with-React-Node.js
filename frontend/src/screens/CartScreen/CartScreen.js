import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import Loader from '../../components/Loader/Loader'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems,loading } = cart



  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      {loading ? <Loader/>:null}
      
      
         <>
          <div className="border-top p-4 text-white mb-3">
      <h1 className="display-6">Shopping Cart</h1>
      </div>    
      <div className="container mb-3">
      <div className="row">

        <div className="col-md-9">
        {cartItems.length === 0 && <EmptyCard/>} 
          <div className="card">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead className="text-muted">
                  <tr className="small text-uppercase">
                    <th scope="col">Product</th>
                    <th scope="col" width={120}>
                      Quantity
                    </th>
                    <th scope="col" width={150}>
                      Price
                    </th>
                    <th scope="col" className="text-right" width={130}></th>
                  </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product}>
                    <td>
                      <div className="row">
                        <div className="col-3 d-md-block mr-4">
                          <img
                            width="80"
                            src={item.image} 
                            alt={item.name}
                          />
                        </div>
                        <div className="col">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-decoration-none"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group input-group-lg mw-140 ml-4">
                      <Form.Control
                      style={{maxWidth:'12rem'}}
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                      </div>
                    </td>
                    <td>
                      <var className="price">$ {item.price}</var>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCartHandler(item.product)}>
                        <IconTrash className="i-va" />
                      </button>
                    </td>
                  </tr> ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer row">
              <div className="col">
              <Link to="/" className="btn btn-secondary">
                <IconChevronLeft className="i-va" /> Continue shopping
              </Link>
              </div>
              <div className="col">
              <Button
                  type='button'
                  className="btn btn-primary float-right"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                Make Purchase <IconChevronRight className="i-va" />

              </Button>
              </div>
            </div>
          </div>
          <div className="alert alert-success mt-3">
            <p className="m-0">
              <IconTruck className="i-va mr-2" /> Free Delivery within 1-2
              weeks
            </p>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <dl className="row border-bottom">
                <dt className="col text-success">
                  <span className="small text-muted">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items</span>
                </dt>
              </dl>
              <dl className="row">
                <dt className="col-sm-6 col-md-12 col-lg-4">Total:</dt>
                <dd className="col-sm-6 col-md-12 col-lg-8 text-right  h5">
                  <strong>{cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)+"$"}</strong>
                </dd>
              </dl>
              <hr />
              <p className="text-center">
                <img
                  src="../../images/payment/payments.webp"
                  alt="..."
                  height={23}
                  width={130}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bg-light border-top p-4">
      <div className="container">
        <h6>Payment and refund policy</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      </div>
      </>
      
  
    </>
  )
}

export default CartScreen
