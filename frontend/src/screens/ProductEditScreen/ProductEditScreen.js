import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import Modal from '../../components/Modal/Modal'
import CustomButton from '../../components/Button/CustomButton'
import useInput from '../../hooks/use-input';
import Input from '../../components/Input/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../utils/validators';



const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    errorMessage: nameErrorMessage,
    setValue: setName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput([VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]);
  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    errorMessage: priceErrorMessage,
    setValue: setPrice,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: brandValue,
    isValid: brandIsValid,
    hasError: brandHasError,
    errorMessage: brandErrorMessage,
    setValue: setBrand,
    valueChangeHandler: brandChangeHandler,
    inputBlurHandler: brandBlurHandler,
    reset: resetBrand,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: countInStockValue,
    isValid: countInStockIsValid,
    hasError: countInStockHasError,
    errorMessage: countInStockErrorMessage,
    setValue: setCountInStock,
    valueChangeHandler: countInStockChangeHandler,
    inputBlurHandler: countInStockBlurHandler,
    reset: resetCountInStock,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    errorMessage: categoryErrorMessage,
    setValue: setCategory,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetcategory,
  } = useInput([VALIDATOR_REQUIRE()]);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    errorMessage: descriptionErrorMessage,
    setValue: setDescription,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput([VALIDATOR_REQUIRE()]);

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)

      }
    }
  }, [dispatch, history, productId, product, successUpdate,setName,setPrice,setImage,setBrand,setCategory, setCountInStock,setDescription])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name: nameValue,
        price: priceValue,
        image,
        brand:brandValue,
        category:categoryValue,
        description: descriptionValue,
        countInStock:countInStockValue,
      })
    )
    resetName()
    resetPrice()
    resetBrand()
    resetCountInStock()
    resetcategory()
    resetDescription()
  }

  

  const closeModalHandler = () => {
    history.push('/')
  };



  let formIsValid = false;

  if (nameIsValid && priceIsValid && brandIsValid && countInStockIsValid && 
      categoryIsValid && descriptionIsValid
    ) {
    formIsValid = true;
  }


  const NameClasses = nameHasError ? 'my-form-control invalid' : 'my-form-control';
  const priceClasses = priceHasError ? 'my-form-control invalid' : 'my-form-control';
  const brandClasses = brandHasError ? 'my-form-control invalid' : 'my-form-control';
  const countInStockClasses = countInStockHasError ? 'my-form-control invalid' : 'my-form-control';
  const categoryClasses = categoryHasError ? 'my-form-control invalid' : 'my-form-control';
  const descriptionClasses = descriptionHasError ? 'my-form-control invalid' : 'my-form-control';

  return (
    <>
      <Modal
        show={true}
        onCancel={closeModalHandler}
        footer={<CustomButton to="/">CLOSE</CustomButton>}
      >
        <Link to='/admin/productlist' className='btn btn-light my-3'>
        <i aria-hidden="true" className="grey backward icon"></i>Go Back
      </Link>
         <div className="place-form">
          <h1>Edit Product</h1>
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
                mainClasses={priceClasses}
                labelName='Price'
                inputId='price'
                inputType='number'
                inputValue={priceValue}
                inputOnChange={priceChangeHandler}
                inputOnBlur={priceBlurHandler}
                inputHasError={priceHasError}
                errorMessage={priceErrorMessage}
              />
              <Input 
                mainClasses="my-form-control"
                labelName='Image'
                inputId='image'
                inputType='text'
                inputValue={image}
                inputOnChange={priceChangeHandler}
                disabled
              />
              <input
                  type='file'
                  label='Choose File'
                  id='image-file'
                  onChange={uploadFileHandler}
                  style={{marginBottom: '1rem'}}
              />
              <Input 
                mainClasses={brandClasses}
                labelName='Brand'
                inputId='brand'
                inputType='text'
                inputValue={brandValue}
                inputOnChange={brandChangeHandler}
                inputOnBlur={brandBlurHandler}
                inputHasError={brandHasError}
                errorMessage={brandErrorMessage} 
              />
              <Input 
                mainClasses={countInStockClasses}
                labelName='Count In Stock'
                inputId='countInStock'
                inputType='number'
                inputValue={countInStockValue}
                inputOnChange={countInStockChangeHandler}
                inputOnBlur={countInStockBlurHandler}
                inputHasError={countInStockHasError}
                errorMessage={countInStockErrorMessage}
              />
              <Input 
                mainClasses={categoryClasses}
                labelName='Category'
                inputId='category'
                inputType='text'
                inputValue={categoryValue}
                inputOnChange={categoryChangeHandler}
                inputOnBlur={categoryBlurHandler}
                inputHasError={categoryHasError}
                errorMessage={categoryErrorMessage} 
              />
              <Input 
                mainClasses={descriptionClasses}
                labelName='Description'
                inputId='description'
                inputType='text'
                inputValue={descriptionValue}
                inputOnChange={descriptionChangeHandler}
                inputOnBlur={descriptionBlurHandler}
                inputHasError={descriptionHasError}
                errorMessage={descriptionErrorMessage}
                tagType="textarea"
              />
            <div className='form-actions'>
              <button disabled={!formIsValid}>Submit</button>
            </div>
          </form>
           )}
        </div>
  
      </Modal>
    </>
  )
}

export default ProductEditScreen
