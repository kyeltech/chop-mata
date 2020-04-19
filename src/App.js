import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './component/Navbar'
import Details from './component/Details' 
import Cart from './component/Cart'
// import Product from './component/Product'
import ProductList from './component/ProductList'
import Default from './component/Default' 
import Modal from './component/Modal';

class App extends React.Component {
  render(){
  return (
    <React.Fragment>
         <Navbar />
       
  <Switch>
    <Route exact path="/" component={ProductList} />
    <Route path="/cart" component={Cart} />
    <Route path="/details" component={Details} />
    <Route component={Default} />
  </Switch>
  <Modal />
    </React.Fragment>
  );
}
}

export default App;
