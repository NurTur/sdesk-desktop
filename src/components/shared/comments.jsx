import React from 'react';
import { Card, CardTitle, CardText, CardHeader, CardBody } from 'reactstrap';
import {connect} from "react-redux";
import AddComment from "./addComment.jsx";
import UpdateComment from "./updateComment.jsx";
import {DateParse,TimeParse} from "./dateParse.jsx";
import "../../styles/shared/addComment.less";

class Comments extends React.Component {
  state={data:null,modal:false,role:"Все"}

  updateData = () => {
    this.setState({data:null,modal:false})
  }
  
  selectRole = (role) => {
    this.setState({role})
  }

  Card=(e)=>{

  }

  render() {
    const count=this.props.Additional.comments.length;
    const rows=this.props.Additional.comments;
    const {devices,vendors,appUser}=this.props.Entity;
    const {data,modal,role }=this.state;
    console.log("fnue",data,'  ',modal,' ',role);
    return  <div id="additionalBox">            
      {(data!==null && data.ownerId===appUser.id) && <UpdateComment updateData={this.updateData} data={data} modal={modal}/>}
      <AddComment  selectRole={this.selectRole} role={role}/> 
      <div id="additionalSmallBox" style={{marginTop:"50px"}}> 
        {count>0 &&
         rows.filter(function (el) { 
          return (role==="Все" || role===el.type)
        }).map((e)=>           
         <Card className="marginTop">
         <CardHeader>
         {e.user && <div>{e.user.name}</div>}
         <div>Дата:&ensp;{DateParse(e.date)}&ensp;Время:&ensp;{TimeParse(e.date)}</div>
         </CardHeader>
         <CardBody>
          {e.deviceId?
            (e.device.parent?
          <CardTitle>
          {vendors.find(x => x.id === (devices.find(x => x.id === e.deviceId).vendorId)).name}/
          {e.device.parent.name}/
          {e.device.name}
          </CardTitle>:
           <CardTitle>
           {vendors.find(x => x.id === (devices.find(x => x.id === e.deviceId).vendorId)).name}/
           {e.device.name}
           </CardTitle>):""}      
            <CardText>{e.text}{(e.user!==null && e.user.id===appUser.id) && 
            <div id="edit" onClick={()=>this.setState({data:e,modal:true})}></div>}</CardText>
         </CardBody>
            </Card>)
          }
         
            
        </div> </div>    
  }
}

export default connect(state => ({ Additional:state.Additional,Entity:state.Entity }))(Comments);