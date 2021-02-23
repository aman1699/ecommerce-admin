import React, { useState,useEffect } from "react";
import Layout from "./../../../components/layout/index";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Input from "./../../../components/layout/UI/Input/index";
import { login} from "./../../../actions/authaction";
import { useDispatch, useSelector } from "react-redux";

import store from "./../../../store/index";
import { Redirect } from "react-router-dom";
//import { Redirect } from "react-router-dom";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
   if (auth.authenticate)
    return <Redirect to={'/'}/>
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email ,password
    };
    dispatch(login(user));
    console.log(store.getState());
    if (auth.authenticate) {
      props.history.push('/');
    
    }
      
  };
  return (
    <div>
      <Layout />
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit.bind(this)}>
              <Input
                label="Email"
                placeholder="email"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="password"
                value={password}
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
