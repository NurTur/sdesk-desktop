import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Main extends React.Component {
 state={Home:null ,Header:null }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
      const data = await import(/* webpackChunkName: 'Home' */ './components/home.jsx');
      const data2 = await import(/* webpackChunkName: 'Header' */ './components/header.jsx');
      this.setState({ Home: data.default ,Header: data2.default });
}

  render() {
   const {Home,Header}=this.state;
    return (  
      <Provider store={store}> 
          <Router>  
        { Header!==null && <Header/>}    
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/nopage" component={()=><div>Not Found</div>} />
         </Switch>
         </Router> 
      </Provider>
   );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));








