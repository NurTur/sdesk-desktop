import React from "react";
import { UncontrolledTooltip } from 'reactstrap';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDog } from "../actions/dogs";
import SettingsHome from "./settingsHome.jsx";
import ViewerFilters from "./shared/viewerFilters.jsx";  
import "../styles/header.less";

class Header extends React.Component
{
  state = { visible: false };

componentDidMount() {
  document.addEventListener('click', this._handleClick);
};

componentWillUnmount() {
  document.removeEventListener('contextmenu', this._handleContextMenu);
  document.removeEventListener('click', this._handleClick);
}

_handleContextMenu = (event) => {
    event.preventDefault();
    console.log("WAW",event.which,' ',event.button);
    this.setState({ visible: true });
  };

_handleClick = (event) => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
};

_handleClickSearch = () => { this.props.fetchDog(); };



render()
  {
    const {name}=this.props.Entity.appUser;
    console.log("Safa");
    return <div id="header">   
     <UncontrolledTooltip placement="top" target="logoutTooltip">Выход</UncontrolledTooltip>
     <UncontrolledTooltip placement="top" target="settingsTooltip">Настройки</UncontrolledTooltip>
     <UncontrolledTooltip placement="top" target="searchTooltip">Поиск</UncontrolledTooltip>
    
     {(this.state.visible) && <ViewerFilters/>}
     
    <div className="logotip"><img alt="logo" className="img" src="/images/logo.png" />CBS SERVICE</div>
    <div id="searchTooltip" className="search" 
    onClick={this._handleClick} 
    onClick={this._handleClickSearch} 
    onContextMenu={this._handleContextMenu}></div>  
    <div className="appuser">{name}</div>
    <div id="logoutTooltip" className="logout" onClick={() => window.location = `logout`}></div> 
    <div id="settingsTooltip" className="settings"><SettingsHome /></div>
    </div>  
  }  
}

export default connect(state => ({ Entity:state.Entity,Dogs:state.Dogs }),
dispatch => bindActionCreators({ fetchDog }, dispatch))(Header);
