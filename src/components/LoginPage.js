import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Form11 from "./test11";

function LoginPage(props) {
  var [modalState, setModalState] = useState(false);
  const username = useRef();
  const password = useRef();
  const remember = useRef();

  function modalOpenClose() {
    setModalState(!modalState);
  }

  const handleLogin = (e) => {
    // this.toggleModal();
    // alert("Username: " + this.username.value + " Password: " + this.password.value
    //     + " Remember: " + this.remember.checked);
    e.preventDefault();
    console.log(
      "Username: " +
        username.current.value +
        " Password: " +
        password.current.value +
        " Remember: " +
        remember.current.checked
    );
    window.location.href='/products'
  };

  return (
    <div>
      {/* <Form11 /> */}
      <Button onClick={modalOpenClose}>Login Button</Button>
      <Modal isOpen={modalState} toggle={modalOpenClose}>
        <ModalHeader toggle={modalOpenClose}>Login Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                // innerRef={(input) => this.username = input}
                ref={username}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // innerRef={(input) => this.password = input}
                ref={password}
              />
            </FormGroup>
            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  // innerRef={(input) => this.remember = input}
                  ref={remember}
                />
                Remember me
              </label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>$hoppingC@rt.inc All Rights Reserved</ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginPage;
