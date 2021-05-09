import React, { useState, useEffect} from 'react'
import { Form} from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  
  useEffect(() => {
    //set new timer
    const timer = setTimeout(async () => {
      //here can be an API fetch
      if (keyword.trim()) {
        history.push(`/search/${keyword}`)
      } else {
        history.push('/')
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword,history])

  const stopPropagationInput=(event)=>{
    event.stopPropagation()
  }

  return (
      <Form.Control 
        onClick={stopPropagationInput}
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
        className='mr-sm-0'
      ></Form.Control >
      
  )
}

export default SearchBox
