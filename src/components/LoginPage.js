import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../Firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useHistory,useLocation } from "react-router-dom";
import { getAuth } from "../Firebase";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";


function LoginPage(props) {
  const [openLogin, setOpenLogin] = useState(false); // to open and close Sign in modal
  const [openSignUp, setOpenSignUp] = useState(false); // to open and close Sign in modal
  const [username, setUsername] = useState(""); // state for username field while logging in
  const [password, setPassword] = useState(""); // state for password field while logging in
  const [email, setEmail] = useState(""); // state for email field while logging in
  const [user, setUser] = useState(null); // To keep track of user we use this state (logged-in user)
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.fetchCartItems()
        history.push("/products");
      }
      else{
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    // const unsubscribe = authWithEmail.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     //if user has logged inn
    //     setUser(authUser);
    //   } else {
    //     // if user has loggedd out
    //     setUser(null); // if user logs out set user to null
    //   }
    // });
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //if user has logged inn
        setUser(authUser);
      } else {
        // if user has loggedd out
        setUser(null); // if user logs out set user to null
      }
      props.isUserLoggedIn(user)
    });
    return () => {
      // whenever changes occue this hook is refired, but before that clean-up the existing case and then re-trigger
      unsubscribe();
    };
  }, [user, username]); // user,username => because everytime values change we need to trigger the useEffect hook


  const onClickLoginButton = () => {
    setOpenLogin(true);
    setUsername("")
    setPassword("")
    setEmail("")
    
  };

  const onClickSignUpButton = () => {
    setOpenSignUp(true);
    setUsername("")
    setPassword("")
    setEmail("")
  };

  const onSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenLogin(false);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(auth.currentUser, {
          displayName: username, //when user is created then add the username value to displayName attribute
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  };

  const onClickLogout=()=>{
    signOut(auth)
    sessionStorage.removeItem('selectedCategory')
    history.push("/");
  }

  return (
    <div>
      {user ? (
          <div className="buttons-login-signup">
            <button
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="buttons-login-signup">
            <button
              className="login-button"
              onClick={onClickLoginButton}
            >
              Login
            </button>
            <button
              className="signup-button"
              onClick={onClickSignUpButton}
            >
              Sign Up
            </button>
          </div>
        )}

        
      <Modal show={openLogin} onHide={() => setOpenLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="with-email-form" onSubmit={onSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="secondary"
              style={{ display: "flex", margin: "0px auto" }}
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={openSignUp} onHide={() => setOpenSignUp(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="with-email-form" onSubmit={onSignUp}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter user-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="secondary"
              style={{ display: "flex", margin: "0px auto" }}
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

    </div>
  );
}

export default LoginPage;
