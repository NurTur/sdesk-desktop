import * as ActionTypes from './actionTypes';
export const UpdateCOLUMN = (arr) => ({ type: ActionTypes.UPDATE_COLUMN, payload: arr });
export const SetLoading=(data)=>({ type: ActionTypes.SET_LOADING, payload:data });
export const SetError=()=>({ type: ActionTypes.SET_ERROR });
	

