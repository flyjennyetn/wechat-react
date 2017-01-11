/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	takeLatest
} from 'redux-saga';

import {
	take,
	put,
	call,
	fork,
	select
} from 'redux-saga/effects';
import {IMGADDRESS} from '../utils/config';
import {xFetch} from '../utils/xFetch';
// import SubjectDetails from '../containers/Subject/Details'

function* subjectQuery() {
	const items = yield call(xFetch, {
		requestUrl: 'interface/getThematicPageList.json',
		startNum: '0',
		endNum: '12'
	})
	items.map((el, k) => {
    el.photoUrl1 = IMGADDRESS + el.photoUrl1;
		items[k].thematicFname = el.thematicFname.split('|');
	})
	yield put({
		type: 'subject/qurery/success',
		items
	});
}

function* learningThematic({
	thematicNum,
	stuCode,
	thematicSname,
	photoUrl1,
	navigator
}) {
	// yield call(xFetch, {
	// 	requestUrl: 'interface/learningThematic.json',
	// 	thematicNum,
	// 	stuCode
	// })
	// navigator.push({
 //        component: SubjectDetails,
 //        name: 'SubjectDetails',
 //        params:{
	// 		thematicSname,
	// 		photoUrl1,
	// 		thematicNum
 //        }
	// });
}

function* watchSubject() {
	yield takeLatest('subject/query', subjectQuery);
}

function* watchLearning() {
	yield takeLatest('subject/learning/thematic', learningThematic);
}


export default function*() {
	yield fork(watchSubject);
	yield fork(watchLearning);
}
