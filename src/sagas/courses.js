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
import {toastShort,formatTime} from '../utils/common';

function format(data) {
    let list = [];
    data.forEach((el,i)=>{
      el.videoImgUrl = IMGADDRESS + el.videoImgUrl;
      if(el.stuTime !==""){
        el.studyState = "[已学习]";
        el.stuTime = formatTime(new Date(el.stuTime));
      }else{
        el.studyState = "[未学习]";
      }
      list.push(el);
    })
    return list;
}

function* coursesQuery({
	token
}) {
	const coursesUp = yield call(xFetch, {
		requestUrl: 'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 1
	});
	const coursesDown = yield call(xFetch, {
		requestUrl: 'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 2
	});
	yield put({
		type: 'courses/qurery/success',
		coursesUp:format(coursesUp.lessonInfoList),
		coursesDown:format(coursesDown.lessonInfoList)
	});
}

function* queryVideoId({
	token,
	lessonId
}) {
	// const videoId = yield call(xFetch, {
	// 	requestUrl: 'interface/getLessonVideoId',
	// 	token,
	// 	lessonId
	// });
	// yield put({
	// 	type: 'courses/set/videoId',
	// 	videoId:videoId
	// });	
}

function* isLearning({
	token,
	grade,
	lessonId
}) {
	const study = yield call(xFetch, {
		requestUrl: 'interface/queryIfExam.json',
		token,
		lessonId
	});
	if (study.isPassStudy == 1) {
      wx.navigateTo({
        url: '/pages/index/quizzes/quizzes?lessonId='+lessonId+'&lessonScore='+study.lessonScore+'&isPassExam='+study.isPassExam
      })
	} else {
		toastShort("请先学习课程！")
	}
}

function* watchCourses() {
	yield takeLatest('courses/query', coursesQuery);
}

function* watchVideoId() {
	yield takeLatest('courses/get/videoId', queryVideoId);
}

function* watchLearning() {
	yield takeLatest('courses/learning', isLearning);
}

export default function*() {
	yield fork(watchCourses);
	yield fork(watchVideoId);
	yield fork(watchLearning);
}
