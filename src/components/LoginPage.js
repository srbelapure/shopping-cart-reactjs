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
  FormFeedback,
} from "reactstrap";
import Form11 from "./test11";

function LoginPage(props) {
  var [modalState, setModalState] = useState(false);
  var [validationErrors, setValidationErrors] = useState({});
  const username = useRef();
  const password = useRef();
  const remember = useRef();
  var addErrorsToRespectiveInputs = {};
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
    addErrorsToRespectiveInputs = validate();
    setValidationErrors((validationErrors = addErrorsToRespectiveInputs));
    if (
      addErrorsToRespectiveInputs.username === "" &&
      addErrorsToRespectiveInputs.password === ""
    ) {
      window.location.href = "/products";
    }
  };

  function validate() {
    const errors = {
      username: "",
      password: "",
    };
    console.log(
      "username,password",
      username,
      password,
      password.current.value === "",
      password.current.value === null,
      password.current.value === undefined,
      password.current.value === " "
    );
    // if(username.current && password.current){
    if (username.current.value === "")
      errors.username = "Enter a valid username";
    if (password.current.value === "")
      errors.password = "Enter a valid password";

    return errors;
  }
  // var addErrorsToRespectiveInputs= validate()
  return (
    <div>
      {/* <Form11 /> */}
      <Button onClick={modalOpenClose}>Login Button</Button>
      <Modal isOpen={modalState} toggle={modalOpenClose}>
        <ModalHeader toggle={modalOpenClose}>Login Details</ModalHeader>
        <ModalBody className="login-modal-body">
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
              {validationErrors.username !== "" ? (
                <div className="error-display">{validationErrors.username}</div>
              ) : (
                <div style={{display:'none'}}>{validationErrors.username}</div>
              )}
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
              {validationErrors.password !== "" ? (
                <div className="error-display">{validationErrors.password}</div>
              ) : (
                <div style={{display:'none'}}>{validationErrors.password}</div>
              )}
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
