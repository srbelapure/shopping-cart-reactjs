import React,{Component} from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";

const store = ConfigureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						<Main/>
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;

