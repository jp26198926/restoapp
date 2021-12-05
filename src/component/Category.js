import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const Category = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const categories = useSelector(state => state.categories);

    const triggerChange = filter => {
        dispatch({type: 'PRODUCT_FILTER', payload: filter})
    }
    return (
        <>
            <Row className="justify-content-md-center mt-3">
                <Col md="auto text-center">Category</Col>
                <Col md="auto text-center">                
                    <Form.Select aria-label="Select Category" value={filter} onChange={e=>triggerChange(e.target.value)}>
                        <option value="All"> All </option>
                        
                        {
                            categories.map(category => {
                                return (<option value={category} key={category}> {category} </option>);
                            })
                        }                        
                    </Form.Select>
                </Col>
            </Row>
        </>
    )
}

export default Category
