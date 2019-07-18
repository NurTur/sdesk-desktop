import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest,RemoveRequest } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownSelect extends React.Component {

state={ dropdownOpen: false} 

handleClicked=(num,obj,len)=>{
  const ticket= this.props.Filter.filters.ticket;
  if (ticket.hasOwnProperty(obj))
  {
    let arr=[];
  if (obj==='statusId') { arr=ticket.statusId['$in']; }
  if (obj==='serviceTypeId') { arr=ticket.serviceTypeId['$in']; } 
  if (obj==='typeId') { arr=ticket.typeId['$in']; } 
  if (obj==='cityId') { arr=ticket.cityId['$in']; } 
 
  if (arr.length===len && num===0)
  {
    this.props.RemoveRequest(obj)
  } 
  else if (arr.length<len && num===0)
  {
    if (obj==='statusId') { this.props.AddRequest({statusId:{$in:[1,3,4,5,6,7,15,18,19,20,21,22,24,25,26,27,28,29,30,31]}}) }
    if (obj==='serviceTypeId') { this.props.AddRequest({serviceTypeId:{$in:[1,2,3,4,5,6,7,8,9,10]}}) }
    if (obj==='typeId') { this.props.AddRequest({typeId:{$in:[1,2,3,4,5,6,7]}}) }
    if (obj==='cityId') { this.props.AddRequest({cityId:{$in:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}}) } 
  } 
  else 
  {
  const index=arr.indexOf(num);
  if (index===-1)
  {
  if (obj==='statusId') { this.props.AddRequest({statusId:{$in:[...arr,num]}}) }
  if (obj==='serviceTypeId') { this.props.AddRequest({serviceTypeId:{$in:[...arr,num]}}) }
  if (obj==='typeId') { this.props.AddRequest({typeId:{$in:[...arr,num]}}) }
  if (obj==='cityId') { this.props.AddRequest({cityId:{$in:[...arr,num]}}) }
} else 
  { 
    arr.splice(index, 1);
    if (arr.length===0) { this.props.RemoveRequest(obj) }
    else { 
      if (obj==='statusId') { this.props.AddRequest({statusId:{$in:arr}}) }
      if (obj==='serviceTypeId') { this.props.AddRequest({serviceTypeId:{$in:arr}}) }
      if (obj==='typeId') { this.props.AddRequest({typeId:{$in:arr}}) }
      if (obj==='cityId') { this.props.AddRequest({cityId:{$in:arr}}) }    
    }
  }
  } 
}  
  else 
  { 
    if (num===0)
    {  
    if (obj==='statusId') { this.props.AddRequest({statusId:{$in:[1,3,4,5,6,7,15,18,19,20,21,22,24,25,26,27,28,29,30,31]}}) }
    if (obj==='serviceTypeId') { this.props.AddRequest({serviceTypeId:{$in:[1,2,3,4,5,6,7,8,9,10]}}) }
    if (obj==='typeId') { this.props.AddRequest({typeId:{$in:[1,2,3,4,5,6,7]}}) }
    if (obj==='cityId') { this.props.AddRequest({cityId:{$in:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}}) } 
    } 
    else { 
      if (obj==='statusId') { this.props.AddRequest({statusId:{$in:[num]}})} 
      if (obj==='serviceTypeId') { this.props.AddRequest({serviceTypeId:{$in:[num]}})} 
      if (obj==='typeId') { this.props.AddRequest({typeId:{$in:[num]}})} 
      if (obj==='cityId') { this.props.AddRequest({cityId:{$in:[num]}})} 
  }
}
      
  this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
  }));
}

Search=(num,obj)=>{
  const ticket= this.props.Filter.filters.ticket;
  if (ticket.hasOwnProperty(obj))
  {
  let arr=[];
  if (obj==='statusId') { arr=ticket.statusId['$in']; }
  if (obj==='serviceTypeId') { arr=ticket.serviceTypeId['$in']; }
  if (obj==='typeId') { arr=ticket.typeId['$in']; }
  if (obj==='cityId') { arr=ticket.cityId['$in']; }
  
  const index=arr.indexOf(num);
  if (index===-1)
  {
  return "white";
  } else 
  { 
    return "rgb(11, 142, 230)";
  }
 } else return "white";
}

toggle() { this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen })); }

 render() {
    const {title,len,array,name} = this.props;
    return (
        <Dropdown toggle={this.toggle.bind(this)} isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{title}&nbsp;{len}</DropdownToggle>
        <DropdownMenu className="dropdownMenu">
        <DropdownItem onClick={()=>this.handleClicked(0,name,array.length)}>Выбрать все/ Отменить все</DropdownItem>
        <DropdownItem divider />
        { array.map((e)=>
        <DropdownItem style={{background:this.Search(e.id,name)}} onClick={()=>this.handleClicked(e.id,name,array.length)}>{e.name}</DropdownItem>) }
        </DropdownMenu>
      </Dropdown>
      );  
    }
}


export default connect(state => ({ Filter: state.Filter,Entity:state.Entity }),
dispatch => bindActionCreators({ AddRequest,RemoveRequest }, dispatch))( DropdownSelect);