import React from 'react';
import { Row, Col, Container} from 'react-bootstrap';
import Layout from './../../components/layout/index';
import './style.css';
import { NavLink } from 'react-router-dom';
const Home = (props) => {
    return (<div>
        <Layout />
        <Container fluid>
        <Row>
                <Col md={2} className="sidebar">
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/category'}>Category</NavLink></li>
                    <li><NavLink to={'/products'}>Products</NavLink></li>
                    <li><NavLink to={'/orders'}>Orders</NavLink></li>
                    </ul>
                    </Col>
            <Col md={10} style={{marginLeft:'auto'}}>container</Col>
            </Row>
            </Container>
        </div> );
}
 
export default Home;