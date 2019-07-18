import React from "react";
import {connect} from "react-redux";
import { Card, CardHeader } from 'reactstrap';

class ViewerFilters extends React.Component
{
render()
  {
     const {ticket}=this.props.Filter.filters; 
     const {statuses,servicetypes,types}=this.props.Entity;
     console.log("nur");
     return (<div className="contextMenu">
        {/******************************Тип заявки***********************************/} 
        {(ticket.hasOwnProperty('typeId') && ticket.typeId['$in'].length>0) && 
        <Card style={{margin:"8px"}}>
        <CardHeader>Тип заявки :&ensp;{types.filter(function (el) { 
            return (ticket.typeId['$in'].indexOf(el.id)>=0)
          }).map((e,i)=>`${i+1}. ${e.name},  `)}</CardHeader>
        </Card>    
        }
        {/******************************Номер заявки соответствие***********************************/} 
        { (ticket.hasOwnProperty('number') && ticket.number.hasOwnProperty('$like')) &&
          <Card style={{margin:"8px"}}>
          <CardHeader>Номер заявки : подстрока =&ensp;
          {ticket.number['$like'].slice(1,ticket.number['$like'].length-1)}</CardHeader>
          </Card>    
        }
        { (ticket.hasOwnProperty('number') && ticket.number.hasOwnProperty('$like')===false) &&
          <Card style={{margin:"8px"}}>
          <CardHeader>Номер заявки =&ensp;{ticket.number}</CardHeader>
          </Card>    
        }
        
          {/******************************Вид работ***********************************/} 
          {(ticket.hasOwnProperty('serviceTypeId') && ticket.serviceTypeId['$in'].length>0) && 
        <Card style={{margin:"8px"}}>
        <CardHeader>Вид работ :&ensp;{servicetypes.filter(function (el) { 
            return (ticket.serviceTypeId['$in'].indexOf(el.id)>=0)
          }).map((e,i)=>`${i+1}. ${e.name},  `)}</CardHeader>
        </Card>    
        }
        {/******************************Дата подачи***********************************/} 
          {(ticket.hasOwnProperty('date')) && 
        <Card style={{margin:"8px"}}>
        <CardHeader>Дата подачи :&ensp;от&ensp;{ticket.date['$between'][0]}
        &ensp;до&ensp;{ticket.date['$between'][1]}</CardHeader>
        </Card>    
        }
        
        {/******************************Статус***********************************/} 
        {(ticket.hasOwnProperty('statusId') && ticket.statusId['$in'].length>0) && 
        <Card style={{margin:"8px"}}>
        <CardHeader>Статус :&ensp;{statuses.filter(function (el) { 
            return (ticket.statusId['$in'].indexOf(el.id)>=0)
          }).map((e,i)=>`${i+1}. ${e.name},  `)}</CardHeader>
        </Card>    
        }
      
 </div>)}

  
}

export default connect(state => ({ Entity:state.Entity, Filter:state.Filter}))(ViewerFilters);
