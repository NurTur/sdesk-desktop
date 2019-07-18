import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest,RemoveRequest } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class DropdownRadio extends React.Component {
state={ dropdownOpen: false, value:"Все",colorYes:"",colorNo:"" } 

toggle=()=>{ this.setState(prevState =>({ dropdownOpen: !prevState.dropdownOpen})); }

handleClickedYes=()=>{
  if (this.state.value==="Да") { this.setState({value:"Все",colorYes:""}) }
  else { this.setState({value:"Да",colorYes:"rgb(11, 142, 230)",colorNo:""}) } 
}

handleClickedNo=()=>{
  if (this.state.value==="Нет") { this.setState({value:"Все",colorNo:""}) }
  else { this.setState({value:"Нет",colorNo:"rgb(11, 142, 230)",colorYes:""}) } 
}

sendRequest=()=>{
  const {value}=this.state;
  if (this.props.name==="warrantyFlag")
  {
    if (value==="Все") {  this.props.RemoveRequest('warrantyFlag') }
    if (value==="Да") {  this.props.AddRequest({warrantyFlag:1}) }
    if (value==="Нет") {  this.props.AddRequest({warrantyFlag:0}) }
  }  
  if (this.props.name==="cbsWarrantyFlag")
  {
    if (value==="Все") {  this.props.RemoveRequest('cbsWarrantyFlag') }
    if (value==="Да") {  this.props.AddRequest({cbsWarrantyFlag:1}) }
    if (value==="Нет") {  this.props.AddRequest({cbsWarrantyFlag:0}) }
  }  
  if (this.props.name==="subcontractorFlag")
  {
    if (value==="Все") {  this.props.RemoveRequest('subcontractorFlag') }
    if (value==="Да") {  this.props.AddRequest({subcontractorFlag:1}) }
    if (value==="Нет") {  this.props.AddRequest({subcontractorFlag:0}) }
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
    const {value,colorYes,colorNo}=this.state;
    return (
        <Dropdown toggle={()=>this.toggle()} isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{title}&ensp;{value}</DropdownToggle>
        <DropdownMenu className="dropdownRadio">
        <DropdownItem style={{background:colorYes}}
        onClick={()=>this.handleClickedYes()}>- Да -</DropdownItem>
        <DropdownItem divider />
        <DropdownItem style={{background:colorNo}}
        onClick={()=>this.handleClickedNo()}>- Нет -</DropdownItem> 
        </DropdownMenu>
      </Dropdown>
      );  
    }
}

export default connect(state => ({ Filter: state.Filter,Entity:state.Entity }),
dispatch => bindActionCreators({ AddRequest,RemoveRequest }, dispatch))( DropdownRadio);







