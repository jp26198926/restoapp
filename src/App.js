import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';

import Category from './component/Category';
import Products from './component/Products';

import InputForm from './component/InputForm';
import Cart from './component/Cart';
import Message from './component/Message';

function App() {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts);
  const totalOrder = useSelector(state => state.totalOrder);

  useEffect(() => {
    document.title = 'Resto App';
    dispatch({type: 'PRODUCT_FILTER', payload: 'All'})
  }, []);

  useEffect(() => {
    let total = 0;
    let totalCount = 0;
    carts.map(product => {
      total += (parseFloat(product.price) * parseFloat(product.qty));
      totalCount = Number(totalCount) + Number(product.qty);
      return(true)
    })
    
    dispatch({ type: 'CART_QTY', payload: totalCount });
    dispatch({ type: 'CART_AMOUNT', payload: total });

  },[carts]);

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to={'/'} >Resto App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={'/add'}>New Entry</Nav.Link>
              <Nav.Link as={Link} to={'/cart'} className="position-relative">
                Cart <Badge pill bg="light" text="dark" >{totalOrder}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>

        <Switch>          
          <Route exact path='/'>
            <Category />
            <Products />
          </Route>
          
          <Route exact  path='/add'>
            <InputForm formName="Add" />
          </Route>

          <Route exact  path='/modify'>
            <InputForm formName="Modify" />
          </Route>

          <Route exact path='/cart'>
            <Cart />
          </Route>

          <Route exact path='/message'>
            <Message />
          </Route>
          
        </Switch>  
           
      </Container>
    </div>
  );
}

export default App;
