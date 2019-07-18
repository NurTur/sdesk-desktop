import {call, put} from 'redux-saga/effects'
import request from '../utils/request';

import {EntityUserLoaded} from '../actions/entity';

export default function *fetchAppUser() {
	const url = `me`
	const obj = yield call(request.get, url)
	yield put(EntityUserLoaded(obj))
}