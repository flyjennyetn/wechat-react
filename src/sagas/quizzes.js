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
import {xFetch} from '../utils/xFetch';
import {IMGADDRESS} from '../utils/config';
function quizzesGetScoreLog({
	isPassExam,
	results
}) {
	var exam = [];
	if (isPassExam == '1') {
		results.map((el, i) => {
			exam[el.subId] = el.subAns;
		});
	} else {
		results.examList.map((el, i) => {
			exam[el.examId] = '';
		});
		results.examSelect.map((el, i) => {
			exam[el.examId] = '';
		});
	}
	return exam;
}


function* quizzesQueryQuestions({token,lessonId, lessonScore, isPassExam}) {

	const data = yield call(xFetch, {
		requestUrl: 'interface/getListExam.json',
		lessonId
	});

	var exam = [];
	if (isPassExam == 1) {
		let result = yield call(xFetch, {
			requestUrl: 'interface/getScoreLog.json',
			stuCode: token,
			lessonId
		});

    let str = result.results;
    str = str.substring(0,str.length-3) + str.substring(str.length-2,str.length);
    result = JSON.parse(str).results;

		exam = yield call(quizzesGetScoreLog, {
			isPassExam: isPassExam,
			results: result
		});
	} else {
		exam = yield call(quizzesGetScoreLog, {
			isPassExam: isPassExam,
			results: data
		});
	}

 let examSelect = [];
 let examListLength = data.examList.length;
 data.examSelect.map((el,i)=>{
      if(el.selectType == 2){
        el.options = [
            ['A',IMGADDRESS+el.optionA],
            ['B',IMGADDRESS+el.optionB]
        ];   
      }else{
        el.options = [
            ['A',el.optionA],
            ['B',el.optionB],
            ['C',el.optionC],
            ['D',el.optionD],
            ['E',el.optionE],
            ['F',el.optionF]
        ];
      }
      el.index = examListLength + (i+1)
      examSelect.push(el);
  })

	yield put({
		type: 'quizzes/qurery/questions/success',
		lessonScore: isPassExam != 0 ? lessonScore : 'no',
		examPaperName: data.examPaperName,
		examList: data.examList,
		examSelect: data.examSelect,
		exam
	});
}

function* quizzesQuizzesScore({
  results,
  lessonId,
  stuCode
}) {
  const lessonScore = yield call(xFetch, {
    requestUrl: 'interface/getScore.json',
    results,
    lessonId,
    stuCode
  });
  yield put({
    type: 'quizzes/set/lessonScore',
    lessonScore
  })
}

function* watchQuizzesQuestions() {
  yield takeLatest('quizzes/query/questions', quizzesQueryQuestions);
}

function* watchQuizzesScore() {
  yield takeLatest('quizzes/query/Score', quizzesQuizzesScore);
}

export default function*() {
	yield fork(watchQuizzesQuestions);
  yield fork(watchQuizzesScore);

}
