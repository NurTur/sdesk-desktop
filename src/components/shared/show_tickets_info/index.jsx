import React from 'react';
import { Button } from 'reactstrap';
import request from '../../../utils/request';
import ShowTicketCustomer from './showTicketCustomer.jsx';
import "../../../styles/shared/showTicketsInfo.less";



class Index extends React.Component {
 
    state = { modal: false, searchArray:[] };

    toggle=()=> {
      this.setState({ modal: true }); 
    }
  
    toggleModal=(bool)=>{
      this.setState({modal:bool});
    }
     
    RequestRes=(searchArray)=>{
      this.setState({searchArray});
    }
      
   componentDidUpdate(prevProps, prevState)
  {   
  if (prevState.modal===false && this.state.modal)
  {
    const url=`api/v2/tickets/${this.props.item.id}`;
    const obj = request.get(url);
    obj.then(searchArray=>this.RequestRes(searchArray))   
  }   
}
       

  render() {
    const {item}=this.props;
    const {searchArray,modal}=this.state;
  
     
    return (
        <React.Fragment>
            <Button className="fontMiddle" onClick={this.toggle} color="primary">Инфо</Button>
            { modal &&
            <ShowTicketCustomer modal={true} searchArray={searchArray} 
            toggleModal={this.toggleModal} typeId={item.typeId}/>}
    
        </React.Fragment>
    );
  }
}

export default Index;