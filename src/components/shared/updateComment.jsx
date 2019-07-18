import React from 'react';
import {Button, Modal, ModalHeader, ModalBody,ModalFooter,Row,Col} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { EditComment } from "../../actions/additional";
import {DateParse,TimeParse} from "./dateParse.jsx";


class UpdateComment extends React.Component {
  state = { vendName:'', parentArr:[],childArr:[],knot:null,
            text: this.props.data.text,
            knotName:'' };
  
  toggle=()=> { this.props.updateData(); }

  componentWillMount() {
    const {devices,vendors}=this.props.Entity;
    const {data}=this.props;
    let vendName="(Без вендора)";
    let vendId=35;
    let knotName='';
    let knot=null;
    if (data.deviceId)
    { 
        vendId = devices.find(function(element) { 
        return element.id===data.deviceId; 
        }).vendorId;
        vendName = vendors.find(function(element) { 
            return element.id===vendId; 
        }).name;  
        knot=data.deviceId;
        knotName=data.device.parent!==null?
        `${vendName}/${data.device.parent.name}/${data.device.name}`:
        `${vendName}/${data.device.name}`;

    }       
    this.handleClickedVendor(vendId,vendName);    
    this.handleClickedKnot(knot,knotName);  
   }

  handleClickedKnot=(knot,name)=>{
    this.setState({knot,knotName:this.state.vendName+name});
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

  handleChange=(event)=> {
    this.setState({text: event.target.value});
  }
  
  editComment=async (text,userId,deviceId)=>{
    await this.props.EditComment({id:this.props.data.id,text,userId,deviceId});
    await this.setState({vendName:'', knotName:'', parentArr:[],childArr:[],knot:null,text: '' });
    this.props.updateData();
  }
 


  render() {
    
    const {vendors,appUser}=this.props.Entity;  
    const {knotName,parentArr,childArr,vendName,knot,text}=this.state;    
   
    return (<Modal isOpen={this.props.modal} toggle={this.toggle} size="lg" id="addComment">
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
          value={text} onChange={this.handleChange} />
          </Col> 
          </Row>     
          </ModalBody >
          <ModalFooter>    
          <div style={{width:"100%",height:"40px"}}>
            Дата создания:&ensp;{DateParse(this.props.data.date)}&ensp;Время:&ensp;{TimeParse(this.props.data.date)}</div> 
            {((knot || vendName==="(Без вендора)") && text.length>4)?
            <Button color="primary" onClick={()=>this.editComment(text,appUser.id,knot)}>Редактировать</Button>:
            <Button color="secondary" disabled>Редактировать</Button>}
          </ModalFooter>
        </Modal>
    );
  }
}

export default connect(state => ({ Additional:state.Additional,Entity:state.Entity }),
dispatch => bindActionCreators({ EditComment }, dispatch)) (UpdateComment);