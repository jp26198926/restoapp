import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const Products = () => {
    const dispatch = useDispatch();
    const filterProducts = useSelector(state => state.filterProducts);

    const triggerAdd = product => {
        dispatch({ type: 'CART_ADD', payload: product });
    }
    
    const triggerModify = product => {
        dispatch({ type: 'PRODUCT_SELECTED', payload: product });
    }
    const triggerDelete = id => {
        dispatch({ type: 'PRODUCT_DELETE', payload: id });
    }

    return (
        <>
            <Row>
                {
                    filterProducts.map(product => {
                        return (
                            <Col md={3} className="py-3" key={product.id}>
                                <Card className="shadow">
                                    <Card.Img variant="top" src={product.image} className="p-4" />
                                    <Card.Body className="p-2 text-center">
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            Php {product.price}
                                        </Card.Text>
                                    </Card.Body>                                    
                                    <Card.Footer className="d-grid">
                                        <Button onClick={()=>triggerAdd(product)} variant="dark" className="m-1">Add to Cart</Button>
                                        <Button onClick={()=>triggerModify(product)} as={Link} to={'/modify'} variant="dark" className="m-1">Edit</Button>
                                        <Button onClick={()=>triggerDelete(product.id)} variant="dark" className="m-1">Delete</Button>
                                    </Card.Footer>
                                    </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default Products
