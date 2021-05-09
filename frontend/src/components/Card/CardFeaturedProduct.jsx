import React,{useEffect,useState,useCallback} from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { useSelector } from 'react-redux'

const CardFeaturedProduct = () => {

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const [featureProducts,setFeatureProducts] = useState([])

  
  const randomeChooseFeaturedProducts = useCallback(()=>{
     const arr = []
     
     if(products.length > 0){
        const nums = new Set()
        if(products.length >= 4){
          while(nums.size !== 4) {
            nums.add(Math.floor(Math.random()*products.length));
          }
        }else{
          while(nums.size !== products.length) {
            nums.add(Math.floor(Math.random()*products.length));
          }
        }
        const randomDiffrentNumber = [...nums]
        
        for(let index of randomDiffrentNumber){
            arr.push(products[index])
        }
      } 
   
     setFeatureProducts(arr)
  },[products])

  
  useEffect(() => {
    randomeChooseFeaturedProducts()
  },[products,randomeChooseFeaturedProducts])

  
  return (
    <div className="card mb-3">
      <div className="card-header font-weight-bold text-uppercase">
        Featured Products
      </div>
      <div className="card-body">
        {featureProducts.length === 0 ? <h2>noo</h2> :
        featureProducts.map((product, idx) => (
          <div
            className={`row ${idx + 1 === featureProducts.length ? "" : "mb-3"}`}
            key={idx}
          >
            <div className="col-md-4">
              <img src={product.image} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8">
              <h6 className="text-capitalize mb-1">
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                  {product.name}
                </Link>
              </h6>
              <div className="mb-2">
                {Array.from({ length: product.rating }, (_, key) => (
                  <IconStarFill className="text-warning mr-1" key={key} />
                ))}
              </div>
              <span className="font-weight-bold h5">${product.price}</span>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeaturedProduct;
