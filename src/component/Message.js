import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

const Message = () => {
    const message = useSelector(state => state.message)
    return (
        <div className="text-center my-auto mt-3">
            <Row>
                <Col>
                    <h1>{message}</h1>
                    Return to <Link to='/'>Homepage!</Link>
                </Col>
            </Row>
        </div>
    )
}

export default Message
