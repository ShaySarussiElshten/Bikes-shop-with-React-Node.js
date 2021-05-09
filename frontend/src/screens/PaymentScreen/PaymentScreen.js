import React, { useState } from 'react'
import { Form,Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckOutSteps/CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import './paymentScreen.css'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
    <div className="container mb-3 py-5">
      <div className="card mb-3" style={{maxWidth:'80rem'}}>
      <CheckoutSteps step1 step2 />
      <div className="place-form-payment">
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Row>
              <Form.Check
                type='radio'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <img
                  src="../../images/payment/paypal_64.webp"
                  alt="..."
                  className="ml-3"
                  height={26}
              />
            </Row>
          </Form.Group>

          <div className='form-actions'>
              <button>Continue </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default PaymentScreen
