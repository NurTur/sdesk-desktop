import React from 'react';
import {Button, Modal, ModalHeader, ModalBody,ModalFooter,Row,Col,FormGroup,Input} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { PostComment } from "../../actions/additional";


class AddComment extends React.Component {
  state = { modal: false, vendName:'', knotName:'', parentArr:[],childArr:[],knot:null,text: '' };

  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChangeText=(event)=> {
    this.setState({text: event.target.value});
  }

  handleChangeRole=(event)=> {
    this.props.selectRole(event.target.value);   
  }

  handleClickedVendor=(vendId,vendName)=>{
    const {devices}=this.props.Entity; 
    let parentArr=[];
    let childArr=[];
    if (vendId!==0 && vendId!==35)
    {
      parentArr = devices.filter(item => {
        return (item.vendorId===vendId && item.parentId===null);
      });
      for (let i in parentArr)
      {
       let arr=devices.filter(item => {
        return (item.parentId===parentArr[i].id);
       });
       childArr.push(arr);      
      }      
    }     
   this.setState({vendName,parentArr,childArr,knotName:""});
  }

  handleClickedKnot=(knot,name)=>{
    this.setState({knot,knotName:this.state.vendName+name});
  }
  
  postComment=async (text,ownerId,deviceId)=>{
    await this.props.PostComment({text,ownerId,deviceId});
    this.setState({ modal: false,vendName:'', knotName:'', parentArr:[],childArr:[],knot:null,text: '' });
  }
 

  render() {
    const {vendors,appUser}=this.props.Entity;  
    const {knotName,parentArr,childArr,vendName,knot,text}=this.state;  
    return (
    <React.Fragment>
      <div className="fixedButton">
       
      {this.props.Additional.ticketId?<Button className="button" color="primary" onClick={this.toggle}>+ Комментарий</Button>:
     <Button color="secondary" disabled>+ Комментарий</Button>}
     
<FormGroup className="select">
<Input type="select" value={this.props.role} onChange={this.handleChangeRole}>
  <option value="Все">Все</option>
  <option value="0">Инженеры</option>
  <option value="1">Координ-ры</option>
  <option value="2">Оповещения</option>
  <option value="3">Система</option>
</Input>
</FormGroup>
</div>
      
      <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" id="addComment">
          <ModalHeader toggle={this.toggle}>Выбрано:
          { knotName!==""? knotName: (vendName!==""?vendName:'(выбор устройства и/или узла - обязателен)')}          
           </ModalHeader>

          <ModalBody className="modalBody">
          <Row>   
          <Col sm="3">
          <ListGroup className="box1" flush>
          {vendors.map((e)=>
          <ListGroupItem tag="button" action className="boldFont"
          onClick={()=>this.handleClickedVendor(e.id,e.name)}>{e.name}</ListGroupItem>
          )}             
          </ListGroup>       
          </Col> 

          <Col sm="5">
          <ListGroup className="box2" flush>
          {
           parentArr.map((e,i)=>[<ListGroupItem tag="button" action className="boldFont" 
           onClick={()=>this.handleClickedKnot(e.id,"/"+e.name)}>{e.name}</ListGroupItem>,
           childArr[i].map((el)=><ListGroupItem tag="button" action className="paddingLeft"
           onClick={()=>this.handleClickedKnot(el.id,"/"+e.name+'/'+el.name)}>{el.name}</ListGroupItem>)])        
          }
          </ListGroup>          
          </Col> 
          
          <Col sm="4"><textarea className="box3" type="text" 
          value={text} onChange={this.handleChangeText} />
          </Col> 
        </Row>     
          </ModalBody >
          <ModalFooter>        
           
            {((knot || vendName==="(Без вендора)") && text.length>4)?
            <Button color="primary" onClick={()=>this.postComment(text,appUser.id,knot)}>Добавить</Button>:
            <Button color="secondary" disabled>Добавить</Button>}
        </ModalFooter>
        </Modal>
    </React.Fragment>
    );
  }
}

export default connect(state => ({ Additional:state.Additional,Entity:state.Entity }),
dispatch => bindActionCreators({ PostComment }, dispatch)) (AddComment);