import React, { Component } from "react";

var x = "hello";
class FunctionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  firstClick = (item) => {
    x = "hi" + item;
    console.log("1111111111111111111111111111111111111111111111");
  };

  secondClick = () => {
    alert("2");
  };

  test = thirdClick = (item) => {
    return item;
  };
  render() {
    return (
      <div>
        <div
          onClick={() => {
            this.firstClick("beautiful");
          }}
          style={{ border: "1px solid" }}
        >
          first click button {x}
        </div>
        <br />
        <div onClick={this.secondClick} style={{ border: "1px solid" }}>
          second click button
        </div>
        <br />
        <div onClick={this.thirdClick("pqrs")} style={{ border: "1px solid" }}>
          third click button{this.test}
        </div>
      </div>
    );
  }
}

export default FunctionsPage;
