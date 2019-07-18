import * as ActionTypes from './actionTypes';

export function LoadComments() { return {type: ActionTypes.LOAD_COMMENTS} }
export const GetTicketId = (Id,treeData) => ({ type: ActionTypes.GET_TICKET_ID, payload: Id,  treeData});
export const PostComment=(payload)=>({ type: ActionTypes.POST_COMMENT, payload });
export const LoadCommentsById=(payload)=> ({ type: ActionTypes.LOAD_COMMENTS_ID, payload});
export const LoadHistoryById=(payload)=> ({ type: ActionTypes.LOAD_HISTORY_ID, payload});
export const LoadTree=(payload,treeData)=> ({ type: ActionTypes.LOAD_TREE, payload,treeData});
export const EditComment=(payload)=>({ type: ActionTypes.EDIT_COMMENT, payload });








