import React from 'react'
import { useHistory } from 'react-router';
import { Table, Col, Row, Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts);
    const totalOrder = useSelector(state => state.totalOrder);
    const totalAmount = useSelector(state => state.totalAmount);

    const triggerChange = (e, id) => {
        if (Number(e.target.value) > 0) {
            dispatch({ type: 'SET_QTY', payload: { id, qty: e.target.value } });
        }
    }

    const triggerCancelItem = id => {
        dispatch({ type: 'CART_CANCEL_ITEM', payload: id });
    }

    const triggerCancel = () => {
        dispatch({ type: 'CART_CLEAR' });
        dispatch({type: 'SET_MESSAGE', payload: 'Order has been cancelled!'})
        history.push('/message');
    }

    const triggerCheckOut = () => {
        dispatch({ type: 'CART_CLEAR' });
        dispatch({type: 'SET_MESSAGE', payload: 'CheckOut Done, Thank you!'})
        history.push('/message');
    }

    return (
        <div>
            <Row className="mt-3">
                <Col sm={12}><h3>My Cart</h3></Col>
                <Col md={8}>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carts.length > 0 ? //if
                                    carts.map((product, idx) => {
                                        const total = Number(product.qty) * Number(product.price);
                                        const count = idx + 1;
                                        return (
                                            <tr key={product.id}>
                                                <td align="center">{count}</td>
                                                <td>{product.name}</td>
                                                <td align="center">{product.price}</td>
                                                <td align="center">
                                                    <Form.Control
                                                        type="number"
                                                        value={product.qty}
                                                        onChange={e => triggerChange(e, product.id)}
                                                        size="sm"
                                                        style={{width: '5em'}}
                                                    />
                                                </td>
                                                <td align="right">{total.toFixed(2)}</td>
                                                <td align="center">
                                                    <Button onClick={()=>triggerCancelItem(product.id)} size="sm" variant="dark" title="Remove this Item"> X </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : //else
                                    <tr><td colSpan="6" align="center">No Order</td></tr>
                            }
                            
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header><h3>Summary</h3></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col className="text-end">Total QTY</Col>
                                <Col className="text-end">{totalOrder}</Col>
                            </Row>
                            <Row>
                                <Col className="text-end">Sub-Total</Col>
                                <Col className="text-end">{totalAmount.toFixed(2)}</Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-center">   
                            <Button onClick={triggerCheckOut} variant="dark" className="m-1">Checkout</Button>
                            <Button onClick={triggerCancel} variant="outline-dark" className="m-1">Cancel Order</Button>                                    
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default Cart
