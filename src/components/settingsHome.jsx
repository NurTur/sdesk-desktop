import React from 'react';
import { connect } from "react-redux";
import { UpdateCOLUMN } from "../actions/global";
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../styles/settingsHome.less";


class SelectColumn extends React.Component {
 state = { modal: false, check:false, columns:[...this.props.Global.columns] }

 toggle=async ()=> {
  await this.props.UpdateCOLUMN(this.state.columns);
  this.setState(prevState => ({
    modal: !prevState.modal, 
  }));
}

handleCheckedAll=()=> {
  this.setState(prevState => ({
    check: !prevState.check
  }));
  let massiv=[...this.state.columns];
  for (let i in massiv)
  {
  if (massiv[i].constant===false)
  {  
  if (this.state.check)
  { massiv[i].status=false; } else
  { massiv[i].status=true; }
  }
  }
  this.setState({columns:massiv})
  
};

handleChecked=(id)=>{
  let massiv=[...this.state.columns];
  for (let i in massiv)
  {
    if (massiv[i].id===id && massiv[i].status===false)
    { massiv[i].status=true; break; }
    if (massiv[i].id===id && massiv[i].status===true)
    { massiv[i].status=false; break; } }
    this.setState({columns:massiv})
}

render() {
  const {columns,modal,check}=this.state;
  return (
      <div>
        <div className="settingsIcon" onClick={this.toggle}></div>
        <div id="selectColumn">
        <Modal isOpen={modal} toggle={this.toggle} >
          <ModalHeader >Выберите необходимые колонки</ModalHeader>
          <ModalBody>
          <div className="Box">
          <div className="firstBox">

         { columns.filter(function (el) { 
            return (el.id %2 === 1)
          }).map((e,i)=>
          <div key={e.id} className="boxItem"><input type="checkbox" onChange={()=>this.handleChecked(e.id) } checked={e.status} disabled={e.constant}/>{e.value}</div>)}
       
          </div>
          <div className="secondBox">
            {columns.filter(function (el) { 
            return (el.id %2 === 0)
          }).map((e,i)=>
          <div key={e.id} className="boxItem"><input type="checkbox" onChange={()=>this.handleChecked(e.id) } checked={e.status} disabled={e.constant}/> {e.value}</div>)}
          </div>
          
          </div>               
          </ModalBody>
          <ModalFooter >
            <Button color="primary" onClick={this.handleCheckedAll}>Выбрать все/Сбросить все</Button>{' '}
            <Button color="primary" onClick={this.toggle}>Закрыть</Button>
          </ModalFooter>

        </Modal>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ Global: state.Global }),
    dispatch => bindActionCreators({ UpdateCOLUMN }, dispatch))(SelectColumn);

