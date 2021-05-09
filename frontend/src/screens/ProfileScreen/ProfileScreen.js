import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import Modal from '../../components/Modal/Modal'
import CustomButton from '../../components/Button/CustomButton'
import CustomTable from '../../components/Table/CustomTable'
import useInput from '../../hooks/use-input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../utils/validators';
import Input from '../../components/Input/Input'

const ProfileScreen = ({ location, history }) => {
  
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    errorMessage: nameErrorMessage,
    setValue: setName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    errorMessage: emailErrorMessage,
    setValue: setEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    errorMessage: passwordErrorMessage,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(6),VALIDATOR_MAXLENGTH(20)]);
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    errorMessage: confirmPasswordErrorMessage,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(6),VALIDATOR_MAXLENGTH(20)]);




  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success,setName,setEmail])

  const submitHandler = (e) => {
    e.preventDefault()
    if (passwordValue !== confirmPasswordValue) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name:nameValue, email:emailValue, password:passwordValue }))
      setMessage('')
    }
  }

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }


  const NameClasses = nameHasError ? 'my-form-control invalid' : 'my-form-control';
  const emailClasses = emailHasError ? 'my-form-control invalid' : 'my-form-control';
  const passwordClasses = passwordHasError ? 'my-form-control invalid' : 'my-form-control';
  const confirmPasswordClasses = confirmPasswordHasError ? 'my-form-control invalid' : 'my-form-control';


  const closeModalHandler = () => {
    history.push('/')
  };

  return (
    <Modal
        show={true}
        onCancel={closeModalHandler}
        footer={<CustomButton to="/">CLOSE</CustomButton>}
      >
    <Row>
      <Col md={5}>
        <div className="place-form">
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            
            <form onSubmit={submitHandler}>
            <Input 
                mainClasses={NameClasses}
                labelName='Name'
                inputId='name'
                inputType='text'
                inputValue={nameValue}
                inputOnChange={nameChangeHandler}
                inputOnBlur={nameBlurHandler}
                inputHasError={nameHasError}
                errorMessage={nameErrorMessage}
              />

            <Input 
                mainClasses={emailClasses}
                labelName='Email'
                inputId='email'
                inputType='text'
                inputValue={emailValue}
                inputOnChange={emailChangeHandler}
                inputOnBlur={emailBlurHandler}
                inputHasError={emailHasError}
                errorMessage={emailErrorMessage}
              />
              <Input 
                mainClasses={passwordClasses}
                labelName='Password'
                inputId='password'
                inputType='password'
                inputValue={passwordValue}
                inputOnChange={passwordChangeHandler}
                inputOnBlur={passwordBlurHandler}
                inputHasError={passwordHasError}
                errorMessage={passwordErrorMessage}
              />
              <Input 
                mainClasses={confirmPasswordClasses}
                labelName='Confirm Password'
                inputId='confirmPassword'
                inputType='password'
                inputValue={confirmPasswordValue}
                inputOnChange={confirmPasswordChangeHandler}
                inputOnBlur={confirmPasswordBlurHandler}
                inputHasError={confirmPasswordHasError}
                errorMessage={confirmPasswordErrorMessage}
              />
            
            <div className='form-actions'>
              <button disabled={!formIsValid}>Update Profile</button>
            </div>
          </form>
          
          )}
        </div>
      </Col>
      <Col md={7} className="py-3">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <CustomTable>
            <thead>
              <tr>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        )}
      </Col>
    </Row>
    </Modal>
  )
}

export default ProfileScreen
