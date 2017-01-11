/**
 * Created by flyjennyetn on 2016-10-24.
 */
import { combineReducers } from 'redux'

import courses from './courses'
import quizzes from './quizzes'
import subject from './subject'
import user from './user'

const rootReducer = combineReducers({
	courses,
	quizzes,
	subject,
	user
});

export default rootReducer;