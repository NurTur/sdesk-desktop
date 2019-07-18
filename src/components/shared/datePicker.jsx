import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddRequest } from "../../actions/filter";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DatePicker extends React.Component {

state={ dropdownOpen: false }

handleClicked=()=>{
  this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
  }));
}

toggle() { this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen })); }

_handleChangeFrom = (e) => { 
  let input= e.target.value;
  this.props.AddRequest({date:{$between:[input,this.props.Filter.filters.ticket.date['$between'][1]]}});
};

_handleChangeTo = (e) => { 
  let input= e.target.value;
  this.props.AddRequest({date:{$between:[this.props.Filter.filters.ticket.date['$between'][0],input]}});
};

render() {
    const {title} = this.props;
    const dateArr=this.props.Filter.filters.ticket.date['$between'];   
    return (
        <Dropdown toggle={this.toggle.bind(this)} isOpen={this.state.dropdownOpen}>
        <DropdownToggle caret id="title">{title}&nbsp;</DropdownToggle>
        <DropdownMenu className="datepickerMenu">
        <DropdownItem onClick={()=>this.handleClicked()}>
        от&nbsp;&nbsp;<input type="date" id="date" value={dateArr[0]} onChange={this._handleChangeFrom}/>        
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={()=>this.handleClicked()}>
        до&nbsp;&nbsp;<input type="date" id="date" value={dateArr[1]} onChange={this._handleChangeTo}/>        
        </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      );  
    }
}


export default connect(state => ({ Filter: state.Filter }),
dispatch => bindActionCreators({ AddRequest }, dispatch))( DatePicker);