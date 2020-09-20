import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Form } from "reactstrap";

function Form11() {
  var nameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nameRef.current.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name:
        <input placeholder="name" type="text" ref={nameRef} />
      </label>
      <button>Submit</button>
    </Form>
  );
}


export default Form11;