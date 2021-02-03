import React,{Component} from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";


import WorkMaterial from './components/WorkMaterial'

const store = ConfigureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						<Main/>
						{/* <WorkMaterial/> */}
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;

