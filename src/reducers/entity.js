import * as ActionTypes from "../actions/actionTypes";

const initialState = { appUser: {},cities:[], users:[],
					   servicetypes:[],statuses:[],
					   types:[],vendors:[],devices:[], 
					   tickets:{count: 0, rows:[]}, hash:"" }
	  
function Entity(state = initialState, action) {
	switch (action.type) {
	case ActionTypes.ENTITY_USER_LOADED: 
		return Object.assign({},state,{appUser:action.payload})
	case ActionTypes.ENTITY_ALLUSERS_LOADED: 
		return Object.assign({},state,{users:action.payload})	
	case ActionTypes.ENTITY_REFERENCES_LOADED: 
		return Object.assign({},state,{
		cities:action.payload['cities'],
		servicetypes:action.payload['service-types'],
		statuses:action.payload['statuses'],
		types:action.payload['types'],
		vendors:action.payload['vendors'],
		devices:action.payload['devices'],		
		hash:action.payload["hash"]
	})
	case ActionTypes.ENTITY_TICKETS_LOADED: 
		return Object.assign({},state,{tickets:action.payload})	
	default: return state
	}
}

export default Entity;