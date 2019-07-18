import React from 'react';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import Selector from "./selector.jsx";
import { bindActionCreators } from "redux";
import { GetTicketId,LoadComments } from "../actions/additional";
import ShowTicketsInfo from "./shared/show_tickets_info/index.jsx"
import "../styles/tableTickets.less";

class TableTickets extends React.Component {
  render() {
    
    const {columns}=this.props.Global;
    const {rows,count}=this.props.Entity.tickets;
    const {servicetypes,statuses,cities}=this.props.Entity;
    
    const width = parseInt((window.innerWidth-333)*0.98);
    let height=(this.props.status===0?parseInt(window.innerHeight*0.88)+10:parseInt((window.innerHeight*0.88+10)*0.75));
    console.log("WAWA2",width,'  ',height,' ',window.innerHeight-50,'  ',document.body.clientWidth);

    return (
      <React.Fragment>       
     <div id="table"  style={{height:`${height}px`,width:`${width}px`}}>
      <Table striped bordered hover>
        <thead>
          <tr>
          { columns.filter(function (el) { 
            return (el.status)
          }).map((e)=><th id={`col${e.id}`} key={e.id}><Selector id={e.id} value={e.value}/></th>)}    
          </tr>
        </thead>
        <tbody>  
         {count>0?
         rows.map((e)=>
         <tr onClick={()=>this.props.GetTicketId(e.id,{customer: e.customer.name, 
         equipment: 
         `TM - ${(e.equipment==null?"":
         (e.equipment.equipmentType.model==null?"":e.equipment.equipmentType.model))}
          SN - ${(e.equipment==null?"":
          (e.equipment.serialNumber==null?"":e.equipment.serialNumber))}`         
         })}>
         {columns[0].status && <td id="col1">< ShowTicketsInfo item={e} /></td>}
         {columns[1].status && <td id="col2">{e.number}</td>}
         {columns[2].status && <td id="col3">{servicetypes.find(x => x.id === e.serviceTypeId).name}</td>}
         {columns[3].status && <td id="col4">{e.date}</td>}
         {columns[4].status && <td id="col5">{e.warrantyFlag===1?"Да":""}</td>}
         {columns[5].status && <td id="col6">{e.cbsWarrantyFlag===1?"Да":""}</td>}
         {columns[6].status && <td id="col7">{e.equipment==null?"":
         (e.equipment.endWarrantyDate==null?"":e.equipment.endWarrantyDate)}</td>}
         {columns[7].status && <td id="col8">{e.equipment==null?"":
         (e.equipment.endCBSWarrantyDate==null?"":e.equipment.endCBSWarrantyDate)}</td>}
         {columns[8].status && <td id="col9">{e.commonFieldString?e.commonFieldString:""}</td>}
         {columns[9].status && <td id="col10">{e.customer.name}</td>}
         {columns[10].status && <td id="col11">{statuses.find(x => x.id === e.statusId).name}</td>}
         {columns[11].status && <td id="col12">{""}</td>}
         {columns[12].status && <td id="col13">{e.performer==null?"":e.performer.name}</td>}
         {columns[13].status && <td id="col14">{e.equipment==null?"":
         (e.equipment.equipmentType.model==null?"":e.equipment.equipmentType.model)}</td>}
         {columns[14].status && <td id="col15">{e.equipment==null?"":
         (e.equipment.serialNumber==null?"":e.equipment.serialNumber)}</td>}
         {columns[15].status && <td id="col16">{e.equipment==null?"":
         (e.equipment.regNumber==null?"":e.equipment.regNumber)}</td>} 
         {columns[16].status && <td id="col17">{cities.find(x => x.id === e.cityId)?cities.find(x => x.id === e.cityId).name:""}</td>}
         {columns[17].status && <td id="col18">{e.subcontractorFlag===1?"Да":""}</td>}
         {columns[18].status && <td id="col19">{e.reasonDescription==null?"":e.reasonDescription}</td>}       
         
       </tr>          
        ):""}
         
            
        </tbody>
         </Table>
       </div>
     
      </React.Fragment>
    );
  }
}
export default connect(state => ({ Additional:state.Additional,Global: state.Global,Entity: state.Entity }),
dispatch => bindActionCreators({ GetTicketId, LoadComments }, dispatch)) (TableTickets);
