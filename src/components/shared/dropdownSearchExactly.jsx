import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest,RemoveRequest } from "../../actions/filter";
import {AddRequestDate,RemoveRequestDate } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


class DropdownSearchExactly extends React.Component {
state={ dropdownOpen: false,value: "", checked:false } 

handleCheckboxChange = event => this.setState({ checked: event.target.checked });



handleChange  = event =>  this.setState({ value: event.target.value });


componentDidUpdate(prevProps, prevState)
{  
  if (prevState.dropdownOpen && this.state.dropdownOpen===false)
  {
    this.sendRequest(); 
  }
}

sendRequest=()=>{
    const obj=this.props.name;
    const { value,checked }=this.state;
    
    if (obj==='commonFieldString')
    { 
      if (value==="") { this.props.RemoveRequest(obj); }
      else {
        if (checked===false) { this.props.AddRequest({commonFieldString:{$like:`%${value}%`}})  }
        else { this.props.AddRequest({commonFieldString:value}) }
      }
    }
  
    if (obj==='number')
    { 
      if (value==="") { this.props.RemoveRequest(obj); }
      else {
        if (checked===false) { this.props.AddRequest({number:{$like:`%${value}%`}})  }
        else { this.props.AddRequest({number:value}) }
      }
    }

    if (obj==='regNumber')
    { 
      if (value==="") { this.props.RemoveRequestDate(obj); }
      else {
        if (checked===false) { this.props.AddRequestDate({regNumber:{$like:`%${value}%`}})  }
        else { this.props.AddRequestDate({regNumber:value}) }
      }
    }

    if (obj==='serialNumber')
    { 
      if (value==="") { this.props.RemoveRequestDate(obj); }
      else {
        if (checked===false) { this.props.AddRequestDate({serialNumber:{$like:`%${value}%`}})  }
        else { this.props.AddRequestDate({serialNumber:value}) } 
      }
    }   
}   

toggle=()=>{ this.setState(prevState =>({ dropdownOpen: !prevState.dropdownOpen})); }

 render() {
    console.log("nal",this.state.value,' ',this.state.checked);
    const obj=this.props.name;

    return (
        <Dropdown toggle={()=>this.toggle()} isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{this.props.title}</DropdownToggle>
        <DropdownMenu className="dropdownSearchExactly">
        <DropdownItem onClick={()=>this.toggle()}>
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>         
            <Input addon type="checkbox" aria-label="Checkbox for following text input" 
           checked={this.state.checked} onChange={this.handleCheckboxChange}/>
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Поиск"  type="text"
           value={this.state.value} onChange={this.handleChange}/>
      </InputGroup>
        </DropdownItem >       
        </DropdownMenu>
      </Dropdown>
      );  
    }
}

export default connect(state => ({ Filter: state.Filter }),
dispatch => bindActionCreators({ AddRequest,RemoveRequest,AddRequestDate, RemoveRequestDate }, dispatch))( DropdownSearchExactly );





