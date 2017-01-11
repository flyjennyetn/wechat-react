/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	handleActions
} from 'redux-actions';
import {
	combineReducer
} from 'redux';

const quizzes = handleActions({
	['quizzes/qurery/questions/success'](state, action) {
		return {
			...state,
			lessonScore: action.lessonScore,
			examPaperName: action.examPaperName,
			examList: action.examList,
			examSelect: action.examSelect,
			exam: action.exam,
		};
	},
	['quizzes/set/exam'](state, action) {
		state.exam[action.examId] = action.value;
		return {
			...state
		};
	},
	['quizzes/set/lessonScore'](state, action) {
		return {
			...state,
			lessonScore: action.lessonScore
		};
	}
}, {
	examPaperName: '',
	lessonScore: 'no',
	examList: null,
	examSelect: null,
	exam: []
});

export default quizzes;
