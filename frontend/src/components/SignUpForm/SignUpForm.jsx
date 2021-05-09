import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import { register } from '../../actions/userActions'
import { Button as SamenticButton, Header, Message as SamenticMessage,  } from 'semantic-ui-react'
import useInput from '../../hooks/use-input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../utils/validators';
import Input from '../Input/Input'


const SignUpForm = ({ location, history }) => {

  const [message, setMessage] = useState(null)

  
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    errorMessage: nameErrorMessage,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput([VALIDATOR_REQUIRE()]);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    errorMessage: emailErrorMessage,
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


  
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'


  useEffect(() => {

    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    if (passwordValue !== confirmPasswordValue) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(nameValue, emailValue, passwordValue))
      setMessage('')
    }
  }

  let formIsValid = false;

  if (nameIsValid && passwordIsValid && confirmPasswordIsValid&& emailIsValid) {
    formIsValid = true;
  }


  const nameClasses =  nameHasError ? 'my-form-control invalid' : 'my-form-control';
  const emailClasses = emailHasError ? 'my-form-control invalid' : 'my-form-control';
  const passwordClasses = passwordHasError ? 'my-form-control invalid' : 'my-form-control';
  const confirmPasswordClasses = confirmPasswordHasError ? 'my-form-control invalid' : 'my-form-control';



  return (
    <div className="place-form-sign">
      <Header as='h1' color='teal' textAlign='center'>
            Sign Up
        </Header>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
             <Input 
                mainClasses={nameClasses}
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
                inputType='email'
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

          <SamenticButton color='teal' fluid size='large' type='submit' disabled={!formIsValid}>
             Register
          </SamenticButton>
      </form>
      <SamenticMessage>
           Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
      </SamenticMessage>
  </div>
  )
}

export default SignUpForm
