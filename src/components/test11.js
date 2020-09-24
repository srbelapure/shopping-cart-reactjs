import React, { Component } from "react";

// export default class Form11 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list1: [{ id: 0 }, { id: 1 }, { id: 2 }],
//       list2: [
//         {
//           liId: 0,
//           id: 0,
//           name: "a",
//         },
//         {
//           liId: 1,
//           id: 1,
//           name: "b",
//         },
//         {
//           liId: 1,
//           id: 2,
//           name: "c",
//         },
//         {
//           liId: 2,
//           id: 3,
//           name: "d",
//         },
//       ],
//       selectedCategoryList: [],
//     };
//   }
//   ClickButton = (item) => {
//     console.log("flower", item);
//     if (item === 0) {
//       this.setState({
//         selectedCategoryList: this.state.list2.filter(
//           (item) => item.liId === 0
//         ),
//       });
//     } else if (item === 1) {
//       this.setState({
//         selectedCategoryList: this.state.list2.filter(
//           (item) => item.liId === 1
//         ),
//       });
//     } else if (item === 2) {
//       this.setState({
//         selectedCategoryList: this.state.list2.filter(
//           (item) => item.liId === 2
//         ),
//       });
//     }
//   };

//   RenderSubCategoryList(item) {
//     debugger;
//     if(item){
//       item.map((i) => {
      
//       });
//     }
//   };
//   render() {
  

//     console.log("qqqqqqqqqqq", this.state.selectedCategoryList);
//     return (
//       <div>
//         <div>
//           {this.state.list1.map((item) => {
//             return (
//               <button key={item.id} onClick={() => this.ClickButton(item.id)}>
//                 {item.id}
//               </button>
//             );
//           })}
//         </div>
//         <div>{this.state.selectedCategoryList.map(item=>{
//             return (
//               <div>
//                 <h1>{item.id}</h1>
//                 <h6>{item.name}</h6>
//               </div>
//             );
//         })}</div>
//       </div>
//     );
//   }
// }


class MyComponent extends Component {
  constructor(props) {
      super(props);
      this.toggleClass= this.toggleClass.bind(this);
      this.state = {
          active: false,
      };
  }
  toggleClass() {
      const currentState = this.state.active;
      this.setState({ active: !currentState });
  };

  render() {
      return (
          <div 
              className={this.state.active ? 'your_className': null} 
              onClick={this.toggleClass} 
          >
              <p>{this.props.text}</p>
          </div>
      )
}
}

export default class Test extends Component {
  render() {
      return (
          <div>
              <MyComponent text={'1'} />
              <MyComponent text={'2'} />
          </div>
      );
  }
}

