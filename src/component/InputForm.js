import React, { useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const InputForm = ({formName}) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state => state.selectedProduct);
    const products = useSelector(state => state.products);
    const filter = useSelector(state => state.filter); 
    const categories = useSelector(state => state.categories);

    const triggerChange = e => {
        const product = {
            ...selectedProduct,
            [e.target.name]: e.target.value
        }

        dispatch({ type: 'PRODUCT_SELECTED', payload: product });
    }

    const triggerSubmit = e => {
        e.preventDefault(); 
        console.log(selectedProduct);
        if (selectedProduct.name && selectedProduct.price && selectedProduct.category && selectedProduct.image) {

            //check if name exist
            const isExist = products.find(product => product.name.toLowerCase() === selectedProduct.name.toLowerCase());
            if (isExist) {
                alert("Error: Product name already exist!");                
            } else {
                dispatch({
                    type: Number(selectedProduct.id) > 0 ? 'PRODUCT_UPDATE' : 'PRODUCT_ADD',
                    payload: {
                        ...selectedProduct,
                        id: Number(selectedProduct.id) > 0 ? selectedProduct.id : uuid()
                    }
                });

                dispatch({ type: 'PRODUCT_FILTER', payload: filter });
                dispatch({ type: 'PRODUCT_SELECTED_CLEAR' });

                history.push('/');
            }

            
        } else {
            alert("Error: All fields are required!");
        }
        
    }

    useEffect(() => {
        if (formName === 'Add') {
            dispatch({ type: 'PRODUCT_SELECTED_CLEAR' });
        }        
    },[dispatch, formName])

    return (
        <>            
            <Row>
                <Col md={6} className="shadow p-3 mt-2 offset-md-3">
                    <h1>{formName}</h1>
                    <hr />
                    <Form onSubmit={triggerSubmit}>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" value={selectedProduct.name} onChange={triggerChange} type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={6}>
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price" value={selectedProduct.price} onChange={triggerChange} type="number" />
                            </Col>

                            <Col md={6}>
                                <Form.Label>Category</Form.Label>
                                <Form.Select name="category" value={selectedProduct.category} onChange={triggerChange}>                      
                                    <option value=""> -- Select -- </option>
                                    {
                                        categories.map(category => {
                                            return (<option value={category} key={category}> {category} </option>);
                                        })
                                    }         
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Image Link</Form.Label>
                                <Form.Control name="image" value={selectedProduct.image} onChange={triggerChange} type="text" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button type="submit" variant="dark" className="m-1">Submit</Button>
                                <Button as={Link} to={'/'} variant="outline-dark" className="m-1">Cancel</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
           
        </>
    )
}

export default InputForm
