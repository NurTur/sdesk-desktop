import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest,RemoveRequest } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import request from '../../utils/request';


class DropdownSearch extends React.Component {
state={ dropdownOpen: false,value: "", searchArray:[], selectArray:[] } 

handleChange=(event)=> {
  this.setState({value: event.target.value});
}

RequestRes=(searchArray)=>{
  this.setState({searchArray});
}

sendRequest=async()=>{
  if (this.state.selectArray.length>0)
  { 
    if (this.props.name==="customerId") { 
      const arr= await this.state.selectArray.map((e)=>e.id);
    await this.props.AddRequest({customerId:{$in:arr}}) }
    if (this.props.name==="performerId") { 
      const arr= await this.state.selectArray.map((e)=>e.id);
      await this.props.AddRequest({performerId:{$in:arr}}) }   
  } else
  {
     await this.props.RemoveRequest(this.props.name)
  }   
  this.setState(()=>({value:"",searchArray:[] })); 
}



componentDidUpdate(prevProps, prevState)
{  
  if (prevState.value!==this.state.value && this.state.value!=="")
  {
    let url;
    if (this.props.name==="customerId") { url=`api/v2/customers`; }
    if (this.props.name==="performerId") { url=`api/v2/users`; }
    const obj = request.get(url, {name:this.state.value});
    obj.then(searchArray=>this.RequestRes(searchArray))
  }  
  if (prevState.dropdownOpen && this.state.dropdownOpen===false)
  {
    this.sendRequest(); 
  }
}


handleClickedSearch=(id,name)=>{
  const index=this.state.selectArray.indexOf({id,name});
  if (index===-1)
  {
    this.setState(() => ({ 
      dropdownOpen: !this.state.dropdownOpen,
      selectArray:[{id,name},...this.state.selectArray]
    }));  
  }
  else {
    this.setState(prevState=> ({ dropdownOpen: !prevState.dropdownOpen }));  
  } 
}

handleClickedSelect=(index)=>{
  const selectArray=[...this.state.selectArray];
  selectArray.splice(index,1);
  this.setState(prevState=> ({ dropdownOpen: !prevState.dropdownOpen,selectArray }));  
}

toggle=()=>{ this.setState(prevState =>({ dropdownOpen: !prevState.dropdownOpen})); }

 render() {
    const {searchArray,selectArray}=this.state;
    return (
        <Dropdown toggle={()=>this.toggle()} isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{this.props.title}&nbsp;{selectArray.length}</DropdownToggle>
        <DropdownMenu className="dropdownSearch">
        <DropdownItem onClick={()=>this.toggle()}>
        <Input placeholder="Поиск"  type="text"
           value={this.state.value} onChange={this.handleChange}/>
        </DropdownItem >
        <DropdownItem divider />
        
{ selectArray.map((e,i)=>
<DropdownItem style={{background:"rgb(11, 142, 230)"}}
onClick={()=>this.handleClickedSelect(i)}>{e.name}</DropdownItem>) }

        { searchArray.filter(function (el) { 
          return (selectArray.find(x => x.id === el.id)===undefined)
        }).map((e)=>
        <DropdownItem  
        onClick={()=>this.handleClickedSearch(e.id,e.name)}>{e.name}</DropdownItem>) 
        }
      
        </DropdownMenu>
      </Dropdown>
      );  
    }
}

export default connect(state => ({ Filter: state.Filter,Entity:state.Entity }),
dispatch => bindActionCreators({ AddRequest,RemoveRequest }, dispatch))( DropdownSearch);


















