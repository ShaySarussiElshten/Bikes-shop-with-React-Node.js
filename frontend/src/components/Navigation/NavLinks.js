import React from 'react';
import { NavLink} from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox'
import { Route } from 'react-router-dom'
import './NavLinks.css';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

const NavLinks = ({closeDrawerHandler}) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    closeDrawerHandler()
    dispatch(logout())
  }

  const stopPropagationNavDropdown=(event)=>{
    event.stopPropagation()
  }



  return <ul className="nav-links">
    <li>
       <Route render={({ history }) => <SearchBox history={history} />} />
    </li>
    <li>
      <NavLink to='/cart'>
        <i className='fas fa-shopping-cart'></i> Cart
      </NavLink>
    </li>
    <li>
      {userInfo ? (
        <NavDropdown title={"My Details"} id='username' onClick={stopPropagationNavDropdown}>
          <LinkContainer to='/profile' style={{ color: 'black' }}>
            <NavDropdown.Item onClick={closeDrawerHandler}>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler} style={{ color: 'black' }}>
            Logout
                  </NavDropdown.Item>
        </NavDropdown>
        
      ) : (
        <LinkContainer to='/login'>
          <Nav.Link>
            <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
        </LinkContainer>
      )}
    </li>
    <li>
      {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu' onClick={stopPropagationNavDropdown}>
          <LinkContainer to='/admin/userlist' style={{ color: 'black' }}>
            <NavDropdown.Item onClick={closeDrawerHandler}>Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/productlist' style={{ color: 'black' }}>
            <NavDropdown.Item onClick={closeDrawerHandler}>Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/admin/orderlist' style={{ color: 'black' }}>
            <NavDropdown.Item onClick={closeDrawerHandler}>All Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </li>
  </ul>
};

export default NavLinks;