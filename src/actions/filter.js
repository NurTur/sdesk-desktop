import * as ActionTypes from './actionTypes';
export const AddRequest = (data) =>({type:  ActionTypes.ADD_REQUEST, payload:data });
export const RemoveRequest = (data) =>({type:  ActionTypes.REMOVE_REQUEST, payload:data });
export const AddRequestDate = (data) =>({type:  ActionTypes.ADD_REQUEST_DATE, payload:data });
export const RemoveRequestDate = (data) =>({type:  ActionTypes.REMOVE_REQUEST_DATE, payload:data });
export const AddRequestTimeout = (data) =>({type:  ActionTypes.ADD_REQUEST_TIME, payload:data });
export const RemoveRequestTimeout = (data) =>({type:  ActionTypes.REMOVE_REQUEST_TIME, payload:data });
