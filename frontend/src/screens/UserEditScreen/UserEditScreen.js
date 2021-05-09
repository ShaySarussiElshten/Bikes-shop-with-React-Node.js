import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import useInput from '../../hooks/use-input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from '../../utils/validators';
import Input from '../../components/Input/Input'
import Modal from '../../components/Modal/Modal'
import CustomButton from '../../components/Button/CustomButton'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    errorMessage: nameErrorMessage,
    setValue: setName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    errorMessage: emailErrorMessage,
    setValue: setEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]);
  const {
    value: isAdminValue,
    setValue: setIsAdmin,
    reset: resetIsAdmin,
  } = useInput([]);





  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate,setName,setEmail,setIsAdmin])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name:nameValue, email:emailValue, isAdmin:isAdminValue }))

    resetName();
    resetEmail()
    resetIsAdmin()

  }

  let formIsValid = false;

  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }


  const NameClasses = nameHasError ? 'my-form-control invalid' : 'my-form-control';
  const emailClasses = emailHasError ? 'my-form-control invalid' : 'my-form-control';

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
      <Link to='/admin/userlist' className='btn btn-light my-3'>
         <i aria-hidden="true" className="grey backward icon"></i>Go Back
      </Link>
      <div className="place-form">
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdminValue}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>


            <div className='form-actions'>
              <button disabled={!formIsValid}>Update</button>
            </div>
          </form>
        )}
      </div>
      </Modal>
      
    </>
  )
}

export default UserEditScreen
