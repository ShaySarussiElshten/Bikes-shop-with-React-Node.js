import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import CheckoutSteps from '../../components/CheckOutSteps/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'
import useInput from '../../hooks/use-input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../utils/validators';
import Input from '../../components/Input/Input'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart


  const {
    value: addressValue ,
    isValid: addressIsValid,
    hasError: addressHasError,
    setValue: setAddress,
    errorMessage: addressErrorMessage,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    setValue: setCity,
    errorMessage: cityErrorMessage,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    setValue: setPostalCode,
    errorMessage: postalCodeErrorMessage,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: countryValue,
    isValid: countryIsValid,
    hasError: countryHasError,
    setValue: setCountry,
    errorMessage: countryErrorMessage,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
  } = useInput([VALIDATOR_REQUIRE()]);

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(
      { 
        address:addressValue, 
        city:cityValue, 
        postalCode:postalCodeValue, 
        country:countryValue
      }))
    history.push('/payment')
  }

  useEffect(() => {
    setAddress(shippingAddress.address)
    setCity(shippingAddress.city)
    setPostalCode(shippingAddress.postalCode)
    setCountry(shippingAddress.country)

  },[shippingAddress,setAddress,setCity,setPostalCode,setCountry])


  let formIsValid = false;

  if (addressIsValid && cityIsValid && postalCodeIsValid && countryIsValid ) {
    formIsValid = true;
  }


  const addressClasses = addressHasError ? 'my-form-control invalid' : 'my-form-control';
  const cityClasses = cityHasError ? 'my-form-control invalid' : 'my-form-control';
  const postalCodeClasses = postalCodeHasError ? 'my-form-control invalid' : 'my-form-control';
  const countryClasses = countryHasError ? 'my-form-control invalid' : 'my-form-control';




  return (
    <div className="container mb-3 py-5">
      <div className="card mb-3" style={{maxWidth:'80rem'}}>
      <CheckoutSteps step1 />
                <div className="card-header">
                  <IconReceipt className="i-va" /> Shipping Infomation
                </div>
                <div className="card-body">
                 <h1>Shipping</h1>
             <form onSubmit={submitHandler}>
              <Input 
                mainClasses={addressClasses}
                labelName='Address'
                inputId='address'
                inputType='text'
                inputValue={addressValue || ''}
                inputOnChange={addressChangeHandler}
                inputOnBlur={addressBlurHandler}
                inputHasError={addressHasError}
                errorMessage={addressErrorMessage}
              />
              <Input 
                mainClasses={cityClasses}
                labelName='City'
                inputId='city'
                inputType='text'
                inputValue={cityValue || ''}
                inputOnChange={cityChangeHandler}
                inputOnBlur={cityBlurHandler}
                inputHasError={cityHasError}
                errorMessage={cityErrorMessage}
              />
              <Input 
                mainClasses={postalCodeClasses}
                labelName='Postal Code'
                inputId='postalCode'
                inputType='number'
                inputValue={postalCodeValue || ''}
                inputOnChange={postalCodeChangeHandler}
                inputOnBlur={postalCodeBlurHandler}
                inputHasError={postalCodeHasError}
                errorMessage={postalCodeErrorMessage}
              />
              <Input 
                mainClasses={countryClasses}
                labelName='Country'
                inputId='country'
                inputType='text'
                inputValue={countryValue || ''}
                inputOnChange={countryChangeHandler}
                inputOnBlur={countryBlurHandler}
                inputHasError={countryHasError}
                errorMessage={countryErrorMessage}
              />

        

            <div className='form-actions'>
              <button disabled={!formIsValid}>Continue </button>
            </div>
           </form>
                  
        </div>
       </div>
    </div>
  )
}

export default ShippingScreen
