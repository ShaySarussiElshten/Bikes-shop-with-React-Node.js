import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import { login } from '../../actions/userActions'
import { Button as SamenticButton, Header, Message as SamenticMessage} from 'semantic-ui-react'
import useInput from '../../hooks/use-input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH
} from '../../utils/validators';
import Input from '../Input/Input'



const SignInForm = ({ location, history }) => {

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

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(emailValue,passwordValue))
  }

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }


  const passwordClasses = passwordHasError ? 'my-form-control invalid' : 'my-form-control';
  const emailClasses = emailHasError ? 'my-form-control invalid' : 'my-form-control';


  return (
    <div className="place-form-sign">
      
        <Header as='h1' color='teal' textAlign='center'>
            Sign In
        </Header>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
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
            <SamenticButton color='teal' fluid size='large' type='submit' disabled={!formIsValid}>
              Login
            </SamenticButton>

        </form>
        <SamenticMessage>
          New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
        </SamenticMessage>
        
    </div>
  )
}

export default SignInForm


