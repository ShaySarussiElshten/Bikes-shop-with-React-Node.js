import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import CheckoutSteps from '../../components/CheckOutSteps/CheckoutSteps'
import { createOrder } from '../../actions/orderActions'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'
import { USER_DETAILS_RESET } from '../../constants/userConstants'
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      
      <div className="container mb-3 py-5">
      <div className="card mb-3" style={{maxWidth:'80rem'}}>

         <CheckoutSteps step1 step2 step3/>
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-header">
                  <IconEnvelope className="i-va" /> Contact Info
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        aria-label="Email Address"
                        value={userInfo.email}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        value={userInfo.name}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <IconTruck className="i-va" /> Shipping Infomation
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        value={cart.shippingAddress.address}
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        value={cart.shippingAddress.city}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row g-3 py-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        value={cart.shippingAddress.postalCode}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address 2 (Optional)"
                        value={cart.shippingAddress.country}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <IconCreditCard2Front className="i-va" /> Payment Method
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-3 border-bottom">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          disabled
                        />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                          <img
                            src="../../images/payment/cards.webp"
                            alt="..."
                            className="ml-3"
                            height={26}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          PayPal
                          <img
                            src="../../images/payment/paypal_64.webp"
                            alt="..."
                            className="ml-3"
                            height={26}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name on card"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Card number"
                        disabled
                      />
                    </div>
                   </div>
                    <div className="row g-3 py-3">
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration month"
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration year"
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="CVV"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {!(cart.cartItems.length === 0) &&
                <div className="card-footer border-info">
                <div className='form-actions'>
                       <button
                          type='button'
                          className='btn-block'
                          disabled={cart.cartItems === 0}
                          onClick={placeOrderHandler}
                        >
                        Place Order
                      </button>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <IconCart3 className="i-va" /> Cart{" "}
                  <span className="badge bg-secondary float-right" style={{width:'2rem',height:'1.6rem',paddingTop: '0.4rem'}}>
                    <span>{cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                  </span>
                </div>
                <ul className="list-group list-group-flush">
                   
                {cart.cartItems.length === 0 ? (
                  <>
                <Message>Your cart is empty</Message>
                <Link to='/profile'>
                      You can find your last order in Your Order's  
                  </Link>
                </>
                  ) : ( 
                    <>
                    {cart.cartItems.map((item, index) => (
                      <li className="list-group-item d-flex justify-content-between lh-sm" key={item.product}>
                        <div className="row">
                          <div className="col-md-2">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                          </div>
                          <div className="col-md-10">
                          <div>
                            <h6 className="my-0"><Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link></h6>
                            <small className="text-muted">{item.qty} x ${item.price}</small>
                            </div>
                            <span className="text-muted">${item.qty * item.price}</span>
                            </div>
                          </div>
                      </li>
                    ))}
                    
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">Price Before</h6>
                    </div>
                    <span className="text-muted">${cart.itemsPrice}</span>
                     </li>
                     <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">Shipping</h6>
                    </div>
                    <span className="text-muted">${cart.shippingPrice}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">Tax</h6>
                      </div>
                      <span className="text-muted">${cart.taxPrice}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (USD)</span>
                      <strong>${cart.totalPrice}</strong>
                    </li>
                    </>
                    
                    )}

                  
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                        {error && <Message variant='danger'>{error}</Message>}
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        </div>
    </>
  )
}

export default PlaceOrderScreen
