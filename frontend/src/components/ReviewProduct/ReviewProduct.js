import React,{useState,useEffect} from 'react'
import {createProductReview} from '../../actions/productActions'
import { useDispatch,useSelector} from 'react-redux'
import Message from '../Message/Message'
import { ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../Rating/Rating'
import Loader from '../Loader/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import { Link } from 'react-router-dom'
import { Comment} from 'semantic-ui-react'
import useInput from '../../hooks/use-input'
import {VALIDATOR_REQUIRE} from '../../utils/validators'
import Input from '../../components/Input/Input'


const ReviewProduct = ({match,product}) => {


    const [rating, setRating] = useState(5)
    //const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const {
      value: commentValue,
      isValid: commentIsValid,
      hasError: commentHasError,
      errorMessage: commentErrorMessage,
      setValue: setComment,
      valueChangeHandler: commentChangeHandler,
      inputBlurHandler: commentBlurHandler,
    } = useInput([VALIDATOR_REQUIRE()]);


    useEffect(() => {
      if (successProductReview) {
        setRating(0)
      }
      if (!product._id || product._id !== match.params.id) {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      }
    }, [dispatch, match, successProductReview,product._id,setComment])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(match.params.id, {
            rating,
            comment:commentValue,
          })
        )
      }

      let formIsValid = false;

      if (commentIsValid) {
        formIsValid = true;
      }


      const commentClasses = commentHasError ? 'my-form-control invalid' : 'my-form-control';

    return (
        <>
            <div className="place-form">
            <h3>Reviews</h3>
              <Comment.Group>
              {product.reviews.map((review) => (
                  <Comment key={review._id}>
                  <Comment.Avatar as='a' src='https://mpng.subpng.com/20180707/puq/kisspng-computer-icons-avatar-clip-art-5b40601d5c8c75.9330992415309455653791.jpg' />
                  <Comment.Content>
                    <Comment.Author>{review.name}</Comment.Author>
                    <Comment.Metadata>
                      <div>{review.createdAt.substring(0, 10)}</div>
                      <Rating value={review.rating} />
                    </Comment.Metadata>
                    <Comment.Text>
                    {review.comment}
                    </Comment.Text>
                  </Comment.Content>
                  </Comment>
                ))}

              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Write a Customer Review</h4>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='5'>5 - Excellent</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='3'>3 - Good</option>
                          <option value='2'>2 - Fair</option>
                          <option value='1'>1 - Poor</option>
                        </Form.Control>
                      </Form.Group>
                      <Input 
                        mainClasses={commentClasses}
                        labelName='Comment'
                        inputId='comment'
                        inputType='text'
                        inputValue={commentValue}
                        inputOnChange={commentChangeHandler}
                        inputOnBlur={commentBlurHandler}
                        inputHasError={commentHasError}
                        errorMessage={commentErrorMessage}
                        tagType="textarea"
                      />

                       
                     <div className='form-actions'>
                      <Button
                        disabled={loadingProductReview || !formIsValid}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                      </div>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
           </Comment.Group>
           </div>
        </>
    )
}

export default ReviewProduct
