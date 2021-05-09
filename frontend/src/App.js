import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import FooterSegment from './components/Footer/FooterSegment'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen'
import CartScreen from './screens/CartScreen/CartScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen/OrderScreen'
import UserListScreen from './screens/UserListScreen/UserListScreen'
import UserEditScreen from './screens/UserEditScreen/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen/OrderListScreen'
import MainNavigation from './components/Navigation/MainNavigation'



const App = () => {

  return (
    <Router>
      <MainNavigation/>
      <main>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          
        </Container>
        <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
      </main>
      <FooterSegment />
    </Router>
  )
}

export default App
