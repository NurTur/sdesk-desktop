import * as ActionTypes from '../actions/actionTypes';
import {call, put, all, select,takeEvery,takeLatest} from 'redux-saga/effects';
import request from '../utils/request';
import {EntityUserLoaded, EntityReferencesLoaded, EntityTicketsLoaded, EntityAllusersLoaded } from '../actions/entity';
import { SetLoading,SetError } from '../actions/global';
import { LoadCommentsById,LoadHistoryById, LoadTree } from '../actions/additional';



const getFilter = (state) => state.Filter;
const getAdditional = (state) => state.Additional;
/************************************************************/
function* fetchAppUser() {
	const url = `me`;
	const obj = yield call(request.get, url)
	yield put(EntityUserLoaded(obj));
}

function* fetchAppAllusers() {
	const url =`api/v2/users`;
	const obj = yield call(request.get, url)
	yield put(EntityAllusersLoaded(obj));
}

function* fetchReferences()
{
	const url = `api/v2/references`;
	const obj = yield call(request.get, url,{hash: "MDswOzA7MDsw"});
	yield put(EntityReferencesLoaded(obj))
}

function* fetchBasicAsync() {
		yield all([fetchAppUser(),fetchReferences(),fetchAppAllusers()]) 
		
}

/***********************************************************/

function* fetchTickets()
{
	const url = `api/v2/tickets`;
 	const params = yield select(getFilter)
	const obj = yield call(request.get, url, params);
  yield put(EntityTicketsLoaded(obj))
}

function* fetchTicketsAsync()
{
	try {
		yield put(SetLoading(true))
		yield fetchTickets()
		yield put(SetLoading(false))
		} catch (error) {
		yield put(SetError()) }
}

/************************************************************/

function *fetchTicketAdditional(action) {
	const ticketId=action.payload;
	const url = `api/v2/comments`;
	const res= yield call(request.get, url, {ticketId});
	yield put(LoadCommentsById(res));
	const url2 = `api/v2/ticket-history`;
	const res2= yield call(request.get, url2, {ticketId});
	yield put(LoadHistoryById(res2));	
	const url3 = `api/v2/tickets/tree/${ticketId}`
	const res3= yield call(request.get, url3);
	yield put(LoadTree(res3,action.treeData));	
}


/************************************************************/
function *postTicketComment({payload: comment}) {
	const url = `api/v2/comments`;
	const params =yield select(getAdditional);
	comment.ticketId=params.ticketId;
	yield call(request.post, url, comment);
	const ticketId=params.ticketId;
	const res= yield call(request.get, url, {ticketId});
	yield put(LoadCommentsById(res))
}
/************************************************************/

function *editTicketComment({payload: comment}) {
	const url = `api/v2/comments`;
	const params =yield select(getAdditional);
	comment.ticketId=params.ticketId;
	yield call(request.put, url, comment)
	const ticketId=params.ticketId;
	const res= yield call(request.get, url, {ticketId});
	yield put(LoadCommentsById(res))
}

export default function* rootSaga() {	
	yield fetchBasicAsync()
	yield fetchTicketsAsync()
	yield takeLatest('FETCHED_DOG', fetchTicketsAsync)
	yield takeLatest(ActionTypes.GET_TICKET_ID, fetchTicketAdditional)
	yield takeLatest(ActionTypes.POST_COMMENT, postTicketComment)
	yield takeLatest(ActionTypes.EDIT_COMMENT, editTicketComment)
	
}