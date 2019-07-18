import React from 'react';
import "../styles/loader.less";

class Loader extends React.Component {
    render () {
      return ( <div className="loadIndicator load8">
      <div className="outer">
          <div className="middle">
              <div className="inner">
                  <div className="loader"></div>
              </div>
          </div>
      </div>
  </div> )
    }
  }
  
  export default Loader; 