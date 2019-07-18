import React from 'react';
import { Card, CardText, CardHeader, CardBody } from 'reactstrap';
import {connect} from "react-redux";
import {DateParse,TimeParse} from "./dateParse.jsx";

class HistoryTicket extends React.Component {
  render() {
   const count=this.props.Additional.history.length;
   const rows=this.props.Additional.history;
    return (
      <div id="additionalBox">
      <div id="additionalSmallBox">           
       {count>0?
         rows.map((e)=>
         <Card className="marginTop">
         <CardHeader>
         <div>{e.status.name}</div>
         <div>Дата:&ensp;{DateParse(e.date)}&ensp;Время:&ensp;{TimeParse(e.date)}</div>
         </CardHeader>
         <CardBody>
           { e.owner       && <CardText>Установил статус :<br/>&emsp;&emsp;{e.owner.name}</CardText>}
           { e.performer   && <CardText>Исполнитель      :<br/>&emsp;&emsp;{e.performer.name}</CardText>}   
           { e.serviceType && <CardText>Вид работ        :<br/>&emsp;&emsp;{e.serviceType.name}</CardText>}       
         </CardBody>
         </Card>  ):""}    
       </div>
    </div>
    );
  }
}

export default connect(state => ({ Additional:state.Additional }))(HistoryTicket);