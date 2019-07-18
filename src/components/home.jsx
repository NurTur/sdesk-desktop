import React from "react";
import TableTickets from "./tableTickets.jsx";
import AdditionalBox from "./additionalBox.jsx";
import TreeBox from "./shared/show_tree/index.jsx";
import {connect} from "react-redux";
import Loader from "./loader.jsx";
import "../styles/home.less";


class Home extends React.Component { 

    render( ) {        
        const {loading,error}=this.props.Global.request;
        const { ticketId, tree }=this.props.Additional;
           
        let result="";   let children=[];     let status=0;
    
        if (tree.hasOwnProperty('children')) { children=tree.children }
        
        if (ticketId!==null && ticketId==tree.id && children.length===1)
        {
            result="Подчиненная заявка";
            status=2;
        } 
        if (ticketId!==null && ticketId==tree.id && children.length>1)
        {
            result="Подчиненные заявки";
            status=2;
        } 
        if (ticketId!==null && ticketId!=tree.id && children.length>0)
        {
            result="Родительская заявка"; 
            status=1;
        } 
         return ( 
        <React.Fragment> 
                <div id="home">    
                <div className="tableHome">
                <TableTickets status={status}/>
                <TreeBox children={children} result={result} status={status}/>
                </div>      
                <AdditionalBox className="additionHome"/> 
                         
                </div>                  
            
            { loading 
              ? <Loader/>
              : error
                  ? <p>Error, try again</p>
                  : "" }
        </React.Fragment>);
    }
}

export default connect(state => ({ Additional: state.Additional, Global: state.Global }))(Home);