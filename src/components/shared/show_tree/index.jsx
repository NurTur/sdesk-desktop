import React from "react";
import {connect} from "react-redux";
import { Table } from 'reactstrap';
import "../../../styles/shared/showTree.less";

class TreeBox extends React.Component { 
    render() {   
    const { tree, treeData }=this.props.Additional;
    const {servicetypes,statuses,users,cities}=this.props.Entity;
    const {children,result,status}=this.props; 
    const width = parseInt((window.innerWidth-333)*0.98);
    let height=(status===0?0:parseInt((window.innerHeight*0.88+10)*0.25));


    console.log("WAW2",status,' ',children)  
    return  <div id="showTree" style={{height:`${height}px`,width:`${width}px`}}>
       <div className="treeHeader">{result}</div>
       <div className="treeMain">

        { status>0 && <Table striped bordered hover>
        <tbody> 
        { status===1 &&
        <tr>
            <td id="col2">{tree.number}</td>
            <td id="col3">{servicetypes.find(x => x.id === tree.serviceTypeId).name}</td>
            <td id="col4">{tree.date}</td>
            <td id="col10">{treeData.customer}</td>
            <td id="col6">{tree.commonFieldString?tree.commonFieldString:""}</td>
            <td id="col11">{statuses.find(x => x.id ===  tree.statusId).name}</td>
            <td id="col14">{treeData.equipment}</td>
        <td id="col17">{cities.find(x => x.id === tree.cityId)?cities.find(x => x.id === tree.cityId).name:""}</td>
        </tr>
        }
       
        { status===2 &&
         children.map((e)=>
         <tr key={e.id}>
         <td id="col2">{e.number}</td>
            <td id="col3">{servicetypes.find(x => x.id === e.serviceTypeId).name}</td>
            <td id="col4">{e.date}</td>
            <td id="col10">{treeData.customer}</td>
            <td id="col6">{e.commonFieldString?e.commonFieldString:""}</td>
            <td id="col11">{statuses.find(x => x.id === e.statusId).name}</td>
            <td id="col14">{treeData.equipment}</td>
            <td id="col17">{cities.find(x => x.id === e.cityId)?cities.find(x => x.id === e.cityId).name:""}</td> 
        </tr>)
        } 
        </tbody>
      </Table>}       
       </div>  
    </div>
   }
}

export default connect(state => ({ Additional: state.Additional, Entity: state.Entity }))(TreeBox);
