import * as ActionTypes from "../actions/actionTypes";

const GetDateNow=()=>
{
    const now=new Date();
    let month;
    if (`${now.getMonth()+1}`.toString().length===1)
    { month=`0${now.getMonth()+1}`.toString(); }
    else { month=`${now.getMonth()+1}`.toString(); }

    let day;
    if (`${now.getDate()}`.toString().length===1)
    { day=`0${now.getDate()}`.toString(); }
    else { day=`${now.getDate()}`.toString(); }

    return `${now.getFullYear()}-${month}-${day}`;
}

const fields={ customer:["id", "name"],
                       equipment:["id", "endWarrantyDate", "id", "endCBSWarrantyDate", "id", "serialNumber", "id", "regNumber", "id", "bnaFlag"],
                       equipmentType:["id", "name", "model"],
                       performer:["id", "name"],
                       ticket:["id", "vendorId", "typeId", "number", "serviceTypeId", "date", "warrantyFlag", "cbsWarrantyFlag", "commonFieldString", "statusId","cityId","subcontractorFlag","reasonDescription"],
                       timeout:["timeout"] };
                       
const filters={ticket:{statusId:{$in:[1,3,4,5,6,15,18,20,21,22,24,25,26,27,29,30,31]},
                                      date:{$between:['2000-01-01',GetDateNow()]} },
                                      equipment:{},timeout:{}}
const count=true;
const sort={ticket: {date: "desc"}};
const limit=[100,0];
                   

const initialState = { filters,fields,sort,limit,count };
      
                    
function Filter(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ADD_REQUEST: 
    const obj1=Object.assign({},{ticket: Object.assign({},state.filters.ticket,action.payload)});
    const obj2=Object.assign({},state.filters,obj1);
    return Object.assign({},state,{filters:obj2}); 
      
    case ActionTypes.REMOVE_REQUEST: 
    let res = Object.assign({}, state)
    delete res.filters.ticket[action.payload];
    return res;

    case ActionTypes.ADD_REQUEST_DATE: 
    const objDate1=Object.assign({},{equipment: Object.assign({},state.filters.equipment,action.payload)});
    const objDate2=Object.assign({},state.filters,objDate1);
    return Object.assign({},state,{filters:objDate2});

      
    case ActionTypes.REMOVE_REQUEST_DATE: 
    let resDate = Object.assign({}, state)
    delete resDate.filters.equipment[action.payload];
    return resDate;

    case ActionTypes.ADD_REQUEST_TIME: 
    const objTime1=Object.assign({},{timeout: Object.assign({},state.filters.timeout,action.payload)});
    const objTime2=Object.assign({},state.filters,objTime1);
    return Object.assign({},state,{filters:objTime2});
      
    case ActionTypes.REMOVE_REQUEST_TIME: 
    let resTime = Object.assign({}, state);
    delete resTime.filters.timeout[action.payload];
    return resTime;

    default: return state;
	}
}

export default Filter;