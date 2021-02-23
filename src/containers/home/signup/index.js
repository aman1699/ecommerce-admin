import React from "react";
import Layout from "./../../../components/layout/index";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Input from "./../../../components/layout/UI/Input/index";
import { useSelector,useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { signup } from './../../../actions/useractions';

const Signup = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userSignup = (event) => {
    event.preventDefault();
    const user = {
      firstName,lastName,email,password
    }
    dispatch(signup(user))
  
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  if (user.loading) {
    return <p>Loading...!</p>
  }
  return (
    <div>
      <Layout />
      <Container>
        {/* {user.message}*/}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup.bind(this)}>
              <Row>
                <Col md={6}>
                  <Input
                    label="FirstName"
                    placeholder="FirstName"
                    value={firstName}
                    type="text"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Col>

                <Col md={6}>
                  <Input
                    label="LastName"
                    placeholder="lastName"
                    value={lastName}
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="password"
                value={password}
                type="password"
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

export default Signup;
