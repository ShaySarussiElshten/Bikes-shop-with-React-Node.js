import React from 'react'
import { Link } from 'react-router-dom'
import SingUpForm from '../../components/SignUpForm/SignUpForm'
import Image from 'react-bootstrap/Image'



const RegisterScreen = ({ location, history }) => {

  const nameAds = ['Apple','Dell','Philips','Quick-heal','Tablets']
  const idx = Math.floor(Math.random()*nameAds.length)
  let ad = nameAds[idx]

  return (
    <div className="container my-3 py-5">
        <div className="row border">
          <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
            <Link to="/">
              <Image
                src={`../../images/banner/${ad}.webp`}
                alt="..."
                fluid
              />
            </Link>
            <Link to="/">
              <img
                src="../../images/banner/Laptops.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-md-6 p-3">
            <SingUpForm location={location} history={history} />
          </div>
        </div>
      </div>
  )
}

export default RegisterScreen
