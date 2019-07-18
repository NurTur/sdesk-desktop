import * as ActionTypes from "../actions/actionTypes";

const InitalState ={ ticketId:null, comments:[],history:[],tree:[], treeData:{ customer:"",equipment:"" } }

function Additional(state = InitalState, action) {
    switch (action.type) {
        case ActionTypes.GET_TICKET_ID: return Object.assign({},state,{ticketId:action.payload}); 
        case ActionTypes.LOAD_COMMENTS_ID: return Object.assign({},state,{comments:action.payload});
        case ActionTypes.LOAD_HISTORY_ID : return Object.assign({},state,{history:action.payload});    
        case ActionTypes.LOAD_TREE : return Object.assign({},state,{tree:action.payload, treeData:action.treeData});       
        default: return state;
    }
};

export default Additional;