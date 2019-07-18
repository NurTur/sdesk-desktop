import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequestDate,RemoveRequestDate } from "../../actions/filter";
import {AddRequestTimeout,RemoveRequestTimeout } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownDate1 extends React.Component {
state={ dropdownOpen: false, value:"" }
toggle=()=>{ this.setState(prevState =>({ dropdownOpen: !prevState.dropdownOpen})); }
handleChange=(event)=> { this.setState({value: event.target.value}); }

sendRequest=()=>{
    const {value}=this.state;
    
    switch(this.props.name) {
      case 'endWarrantyDate':     if (value.length===10) {  this.props.AddRequestDate({endWarrantyDate:value}) }
                                  else {  this.props.RemoveRequestDate("endWarrantyDate") }
      break;
      case 'endCBSWarrantyDate':  if (value.length===10) {  this.props.AddRequestDate({endCBSWarrantyDate:value}) }
                                  else {  this.props.RemoveRequestDate("endCBSWarrantyDate") }
      break;
      case 'timeout':  if (value.length===10) {  
                       this.props.AddRequestTimeout({timeout:value}) }
                       else {  this.props.RemoveRequestTimeout() }
      break;
    }    
  }
  
  componentDidUpdate(prevProps, prevState)
  {  
    if (prevState.dropdownOpen && this.state.dropdownOpen===false)
    {
      this.sendRequest(); 
    }
  }

render() {
    const {title} = this.props;
    
    console.log("val",this.state.value,' - ',this.state.value.length);
    return (
        <Dropdown toggle={()=>this.toggle()}  isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{title}</DropdownToggle>
        <DropdownMenu className="dropdownDate1">
        <DropdownItem onClick={()=>this.toggle()} >
        <input type="date" id="date" value={this.state.value} onChange={this.handleChange}/>        
        </DropdownItem>    
        </DropdownMenu>
      </Dropdown>
      );  
    }
}


export default connect(state => ({ Filter: state.Filter }),
dispatch => bindActionCreators({ AddRequestDate,RemoveRequestDate,
  AddRequestTimeout, RemoveRequestTimeout }, dispatch))(DropdownDate1);