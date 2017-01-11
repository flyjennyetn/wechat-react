/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	handleActions
} from 'redux-actions';
import {
	combineReducer
} from 'redux';

const subject = handleActions({
	['subject/qurery/success'](state, action) {
		return {
			...state,
			items: action.items,
		};
	}
}, {
	items: null
});

export default subject;
