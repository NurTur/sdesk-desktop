import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest,RemoveRequest } from "../actions/filter";
import DropdownSelect from "./shared/dropdownSelect.jsx";
import DropdownSearch from "./shared/dropdownSearch.jsx";
import DropdownRadio from "./shared/dropdownRadio.jsx";
import DropdownDate1 from "./shared/dropdownDate1.jsx";
import DropdownSearchExactly from "./shared/dropdownSearchExactly.jsx";


import DatePicker from './shared/datePicker.jsx';
import "../styles/selector.less";


class Selector extends React.Component {

  render() {
    const {value,id} = this.props;
    const {ticket}=this.props.Filter.filters;
   
/****************************************************************************************/    
if (id===11)
  {
    let arr=[];
    if (ticket.hasOwnProperty('statusId')) { arr=ticket.statusId['$in'];}   
    return (<DropdownSelect title={value} len={arr.length} array={this.props.Entity.statuses} name={"statusId"}/>);  
      
  }
/****************************************************************************************/
if (id===3)
{
    let arr=[];
    if (ticket.hasOwnProperty('serviceTypeId')) { arr=ticket.serviceTypeId['$in']; }   
    return (<DropdownSelect title={value} len={arr.length} array={this.props.Entity.servicetypes} name={"serviceTypeId"}/>);  
}
/****************************************************************************************/
if (id===1)
{
    let arr=[];
    if (ticket.hasOwnProperty('typeId')) { arr=ticket.typeId['$in']; }   
    return (<DropdownSelect title={value} len={arr.length} array={this.props.Entity.types} name={"typeId"}/>);  
}
/****************************************************************************************/
if (id===17)
{
    let arr=[];
    if (ticket.hasOwnProperty('cityId')) {  arr=ticket.cityId['$in']; }   
    return (<DropdownSelect title={value} len={arr.length} array={this.props.Entity.cities} name={"cityId"}/>);  
}
/****************************************************************************************/
if (id===4)
{
   return (<DatePicker title={value}/>);  
}
/****************************************************************************************/
if (id===10)
{
  return (<DropdownSearch title={value} name={"customerId"}/>);  
}
/****************************************************************************************/
if (id===13)
{
  return (<DropdownSearch title={value} name={"performerId"}/>);  
}
/****************************************************************************************/
if (id===5)
{
    return (<DropdownRadio title={value} name={"warrantyFlag"} />)     
}
/****************************************************************************************/
if (id===6)
{
    return (<DropdownRadio title={value} name={"cbsWarrantyFlag"} />)     
}
/****************************************************************************************/
if (id===18)
{
    return (<DropdownRadio title={value} name={"subcontractorFlag"} />)     
}
/****************************************************************************************/
if (id===7)
{
    return (<DropdownDate1 title={value} name={"endWarrantyDate"} />)     
}
/****************************************************************************************/
if (id===8)
{
    return (<DropdownDate1 title={value} name={"endCBSWarrantyDate"} />)     
}
/****************************************************************************************/
if (id===12)
{
    return (<DropdownDate1 title={value} name={"timeout"} />)     
}
/****************************************************************************************/
if (id===9)
{
    return (<DropdownSearchExactly title={value} name={"commonFieldString"} />)     
}
/****************************************************************************************/
if (id===16)
{
    return (<DropdownSearchExactly title={value} name={"regNumber"} />)     
}
/****************************************************************************************/
if (id===15)
{
    return (<DropdownSearchExactly title={value} name={"serialNumber"} />)     
}
/****************************************************************************************/
if (id===2)
{
    return (<DropdownSearchExactly title={value} name={"number"} />)     
}
/****************************************************************************************/

   else { return <div id="title">{value}</div>}  
}
}


export default connect(state => ({ Filter: state.Filter,Entity:state.Entity }),
dispatch => bindActionCreators({ AddRequest,RemoveRequest }, dispatch))(Selector);







