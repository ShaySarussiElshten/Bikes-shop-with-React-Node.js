import React from 'react'
import { Link } from 'react-router-dom'
import './product.css'
import Rating from '../Rating/Rating'
import { Card , Image } from 'semantic-ui-react'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
        <Card className='my-3 p-3 rounded card-product'>
          <Image src={product.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{product.brand}</span>
            </Card.Meta>
            <Card.Description>
                   ${product.price}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
           
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        
          </Card.Content>
      </Card>
     </Link>
    
  )
}

export default Product
